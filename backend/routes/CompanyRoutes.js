const express = require("express");
const router = express.Router();
const CompanyModel = require("../models/CompanyModel");

router.get("/company", async (req, res) => {
    let companies = [];

    if (req.query.slug) {
        companies = await CompanyModel.findOne({ slug: req.query.slug });
    } else if (req.query.page && req.query.size) {
        companies = await CompanyModel.paginate({}, { page: req.query.page, limit: req.query.size });
    } else {
        companies = await CompanyModel.find({}).sort({ createdAt: -1 }).exec();
    }

    try {
        res.status(200).send({ status: 1, message: "Success", data: companies });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.get("/company/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Company Id can not be empty",
        });
    }

    let company = await CompanyModel.findById(req.params.id).populate("deals");
    try {
        res.status(200).send({ status: 1, message: "Success", data: company });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.post("/company", async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Company can not be empty",
        });
    }

    let company = new CompanyModel(req.body);
    try {
        await company.save();
        res.status(201).send({ status: 1, message: "Success", data: company });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.put("/company/:id", async (req, res) => {
    if (!req.params.id || !req.body) {
        return res.status(400).send({
            status: 0,
            message: "Company Body and Id cannot be empty",
        });
    }

    try {
        let company = await CompanyModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send({ status: 1, message: "Success", data: company });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// router.delete("/company/:id", async (req, res) => {
//     // Validate Request
//     if (!req.params.id) {
//         return res.status(400).send({
//             status: 0,
//             message: "Company Id can not be empty",
//         });
//     }

//     let company = await CompanyModel.findByIdAndDelete(req.params.id);
//     try {
//         res.sendStatus(204);
//     } catch (err) {
//         res.status(500).send({
//             status: 0,
//             message: err,
//         });
//     }
// });

module.exports = router;
