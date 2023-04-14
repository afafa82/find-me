const express = require("express");
const router = express.Router();
const AccommodationModel = require("../models/AccommodationModel");
const UserModel = require("../models/UserModel");

router.get("/accommodation", async (req, res) => {
    let accommodations =[];
    if(req.query.slug){
        accommodations = await AccommodationModel.findOne({slug: req.query.slug}).exec();
    }else{

        accommodations = await AccommodationModel.find({}).sort({ createdAt: -1 }).exec();
    }
    try {
        res.status(200).send({ status: 1, message: "Success", data: accommodations });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.get("/accommodation/:id", async (req, res) => {
    

    let accommodation = await AccommodationModel.findById(req.params.id);
    try {
        res.status(200).send({ status: 1, message: "Success", data: accommodation });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.post("/accommodation", async (req, res) => {
    // Validate request
    if (!req.body) {
        return res.status(400).send({
            message: "Accommodation can not be empty",
        });
    }

    let accommodation = new AccommodationModel(req.body);
    try {
        accommodation
            .save()
            .then((doc) => {
                UserModel.findByIdAndUpdate(req.body.user, { $push: { accommodations: doc._id } }, { new: true, useFindAndModify: false }).exec();
                return res.status(201).send({ status: 1, message: "Success", data: accommodation });
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
            message: err.message,
        });
    }
});

router.put("/accommodation/:id", async (req, res) => {
    if (!req.params.id || !req.body) {
        return res.status(400).send({
            status: 0,
            message: "Accommodation Body and Id cannot be empty",
        });
    }

    try {
        let accommodation = await AccommodationModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).send({ status: 1, message: "Success", data: accommodation });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.delete("/accommodation/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Accommodation Id can not be empty",
        });
    }

    try {
        let accommodation = await AccommodationModel.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

module.exports = router;
