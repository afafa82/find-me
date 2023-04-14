const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/CompanyModel");
const { DealModel, DealReviewModel } = require("../models/DealsModel");
var mongoose = require("mongoose");

router.get("/deal", async (req, res) => {
    let deals = [];

    if (req.query.slug) {
        deals = await DealModel.findOne({ slug: req.query.slug }).populate("company").exec();
    } else if (req.query.page && req.query.size) {
        deals = await DealModel.paginate({ status: "active", valid_from: { $lte: new Date() }, valid_till: { $gte: new Date() } }, { page: req.query.page, limit: req.query.size, populate: "company", sort: { createdAt: -1 } });
    } else if (req.query.company_id) {
        let id = mongoose.Types.ObjectId(req.query.company_id);
        deals = await DealModel.find({ company: id }).populate("company").sort({ createdAt: -1 }).exec();
    } else if (req.query.type && req.query.type === "popular") {
        deals = await DealModel.find({ status: "active", valid_from: { $lte: new Date() }, valid_till: { $gte: new Date() } })
            .populate("company")
            .sort({ "stats.num_visits": -1 })
            .limit(5)
            .exec();
    } else {
        deals = await DealModel.find({}).populate("company").sort({ createdAt: -1 }).exec();
    }

    try {
        res.status(200).send({ status: 1, message: "Success", data: deals });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.get("/deal/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Deal Id can not be empty",
        });
    }

    let deal = await DealModel.findById(req.params.id).populate("reviews").populate("company");
    try {
        res.status(200).send({ status: 1, message: "Success", data: deal });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.post("/deal", async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Deal can not be empty",
        });
    }

    let deal = new DealModel(req.body);
    try {
        deal.save()
            .then((docDeal) => {
                CompanyModel.findByIdAndUpdate(req.body.company, { $push: { deals: docDeal._id } }, { new: true, useFindAndModify: false }).exec();
                return res.status(201).send({ status: 1, message: "Success", data: docDeal });
            })
            .catch((err) => {
                return res.status(500).send({
                    status: 0,
                    message: err,
                });
            });
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.put("/deal/:id", async (req, res) => {
    if (!req.params.id || !req.body) {
        return res.status(400).send({
            status: 0,
            message: "Deal Body and Id cannot be empty",
        });
    }

    try {
        let deal = await DealModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send({ status: 1, message: "Success", data: deal });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.delete("/deal/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Deal Id can not be empty",
        });
    }

    let deal = await DealModel.findByIdAndDelete(req.params.id);
    try {
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Deal Reviews
router.get("/deal/:dealId/review", async (req, res) => {
    if (!req.params.dealId) {
        return res.status(400).send({
            status: 0,
            message: "Deal Id can not be empty",
        });
    }

    dealReviews = await DealReviewModel.find({ deal_id: req.params.dealId });

    try {
        res.status(200).send({ status: 1, message: "Success", data: dealReviews });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.get("/deal/:dealId/review/:reviewId", async (req, res) => {
    if (!req.params.dealId) {
        return res.status(400).send({
            status: 0,
            message: "Deal Id can not be empty",
        });
    }

    if (!req.params.reviewId) {
        return res.status(400).send({
            status: 0,
            message: "Review Id can not be empty",
        });
    }

    dealReview = await DealReviewModel.findById(req.params.reviewId);

    try {
        res.status(200).send({ status: 1, message: "Success", data: dealReview });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.post("/deal/:dealId/review", async (req, res) => {
    // Validate request
    if (!req.params.dealId) {
        return res.status(400).send({
            message: "Deal Id can not be empty",
        });
    }

    if (!req.body) {
        return res.status(400).send({
            message: "Review can not be empty",
        });
    }

    let dealReview = new DealReviewModel(req.body);
    try {
        dealReview.save().then((docReview) => {
            DealModel.findByIdAndUpdate(req.body.deal_id, { $push: { reviews: docReview._id } }, { new: true, useFindAndModify: false }).exec();
        });
        res.status(201).send({ status: 1, message: "Success", data: dealReview });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Update Stats
router.post("/deal/:id/:type", async (req, res) => {
    if (!req.params.id || !(req.params.type === "click" || req.params.type === "share")) {
        return res.status(400).send({
            status: 0,
            message: "Deal Id can not be empty",
        });
    }

    let body = {};
    if (req.params.type === "click") {
        body = { $inc: { "stats.num_visits": 1 } };
    } else if (req.params.type === "share") {
        body = { $inc: { "stats.num_shares": 1 } };
    }

    try {
        await DealModel.findByIdAndUpdate(req.params.id, body, { new: true });
    } catch (err) {}
    return res.status(200).send({});
});

module.exports = router;
