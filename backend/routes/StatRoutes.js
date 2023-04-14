const express = require("express");
const AuthMiddleware = require("../middlewares/AuthMiddleware");
const router = express.Router();

const CompanyModel = require("../models/CompanyModel");
const { DealModel } = require("../models/DealsModel");
const GuideModel = require("../models/GuidesModel");
const UserModel = require("../models/UserModel");
const JobsModel = require("../models/JobsModel");
const AccommodationModel = require("../models/AccommodationModel");

router.get("/stats", AuthMiddleware(["admin"]), async (req, res) => {
    let stats = {
        companies: await CompanyModel.countDocuments({}),
        deals: await DealModel.countDocuments({}),
        guides: await GuideModel.countDocuments({}),
        users: await UserModel.countDocuments({}),
        accommodations: await AccommodationModel.countDocuments({}),
        jobs: await JobsModel.countDocuments({}),
    };

    return res.status(200).send(stats);
});
module.exports = router;
