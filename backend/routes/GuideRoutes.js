const express = require("express");
const router = express.Router();
const GuideModel = require("../models/GuidesModel");

// Index
router.get("/guide", async (req, res) => {
    let guides = [];

    if (req.query.slug) {
        guides = await GuideModel.findOne({ slug: req.query.slug });
    } else if (req.query.page && req.query.size) {
        guides = await GuideModel.paginate({}, { page: req.query.page, limit: req.query.size });
    } else if (req.query.type && req.query.type === "popular") {
        guides = await GuideModel.find({}).sort({ "stats.num_visits": -1 }).limit(5).exec();
    } else {
        guides = await GuideModel.find({}).sort({ createdAt: -1 }).limit(6).exec();
    }

    try {
        res.status(200).send({ status: 1, message: "Success", data: guides });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Show
router.get("/guide/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Guide Id can not be empty",
        });
    }

    let guide = await GuideModel.findById(req.params.id);
    try {
        res.status(200).send({ status: 1, message: "Success", data: guide });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Create
router.post("/guide", async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Guide can not be empty",
        });
    }

    let guide = new GuideModel(req.body);
    try {
        await guide.save();
        res.status(201).send({ status: 1, message: "Success", data: guide });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Update
router.put("/guide/:id", async (req, res) => {
    if (!req.params.id || !req.body) {
        return res.status(400).send({
            status: 0,
            message: "Guide Body and Id cannot be empty",
        });
    }

    try {
        let guide = await GuideModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send({ status: 1, message: "Success", data: guide });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Delete
router.delete("/guide/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Guide Id can not be empty",
        });
    }

    let guide = await GuideModel.findByIdAndDelete(req.params.id);
    try {
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Update Stats
router.post("/guide/:id/:type", async (req, res) => {
    if (!req.params.id || !(req.params.type === "click" || req.params.type === "share")) {
        return res.status(400).send({
            status: 0,
            message: "Guide Id can not be empty",
        });
    }

    let body = {};
    if (req.params.type === "click") {
        body = { $inc: { "stats.num_visits": 1 } };
    } else if (req.params.type === "share") {
        body = { $inc: { "stats.num_shares": 1 } };
    }

    try {
        await GuideModel.findByIdAndUpdate(req.params.id, body, { new: true });
    } catch (err) {}
    return res.status(200).send({});
});

module.exports = router;
