const express = require("express");
const { default: mongoose } = require("mongoose");
const { update } = require("../models/CompanyModel");
const router = express.Router();
const CompanyModel = require("../models/CompanyModel");
const JobModel = require("../models/JobsModel");

router.get("/job", async (req, res) => {
    var jobs = [];

    if (req.query.company_id) {
        let id = mongoose.Types.ObjectId(req.query.company_id);
        jobs = await JobModel.find({ company: id }).populate("company").sort({ createdAt: -1 }).exec();
    } else if (req.query.type && req.query.type === "active") {
        jobs = await JobModel.find({ status: "active" }).populate("company").sort({ createdAt: -1 }).exec();
    } else {
        jobs = await JobModel.find({}).populate("company").sort({ createdAt: -1 }).exec();
    }

    try {
        res.status(200).send({ status: 1, message: "Success", data: jobs });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.get("/job/searched", async (req, res) => {
    const regex1 = new RegExp(req.query.title, 'i')
    const regex2 = new RegExp(req.query.city, 'i')
    var filtered = [];
    if(req.query.title && req.query.city){
        filtered = await JobModel.find({ $and: [{title: regex1 }, {'address.city': regex2} ] }).populate("company").sort({ createdAt: -1 }).exec();
    }
    else if(req.query.title){
        filtered = await JobModel.find({title : {$regex : regex1}}).populate("company").sort({ createdAt: -1 }).exec();
    }else if(req.query.city){
        //db.inventory.find( { "size.uom": "in" } )
        filtered = await JobModel.find({ 'address.city' : regex2}).populate("company").sort({ createdAt: -1 }).exec();
        console.log(filtered)
    }
    console.log(filtered)
  
    try {
        res.status(200).send({ status: 1, message: "Success", data: filtered });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});



router.get("/job/getCompanyNames", async (req, res) => {
    let companies = await CompanyModel.find({})
    try{
        res.status(200).send({status: 1, message: "success", data: companies})
    }catch(err){
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
})


router.get("/job/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Job Id can not be empty",
        });
    }

    let job = await JobModel.findById(req.params.id).populate("company").exec();
    try {
        res.status(200).send({ status: 1, message: "Success", data: job });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.post("/job", async (req, res) => {
    // Validate request
   
    if (!req.body) {
        return res.status(400).send({
            message: "Job can not be empty",
        });
    }

    let job = new JobModel(req.body);
    try {
        job.save()
            .then((docJob) => {
                CompanyModel.findByIdAndUpdate(req.body.company, { $push: { jobs: docJob._id } }, { new: true, useFindAndModify: false }).exec();
                return res.status(200).send({ status: 1, message: "Success", data: docJob });
            })
            .catch((err) => {
                return res.status(500).send({
                    status: 0,
                    message: err.message,
                });
            });
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.put("/job/:id", async (req, res) => {
    if (!req.params.id || !req.body) {
        return res.status(400).send({
            status: 0,
            message: "Job Body and Id cannot be empty",
        });
    }
    const updates = Object.keys(req.body.objSend)
    try {
        const jobPost = await JobModel.findOne({ _id: req.params.id})
        if (!jobPost) {
            return res.status(404).send()
        }
        updates.forEach((update) => {
           if(update === 'street' || update === 'city' || update === 'province' || update === 'postal_code'){  
               jobPost.address[update] = req.body.objSend[update];
            }
               else{
                   jobPost[update] = req.body.objSend[update]
               }
        })
         await jobPost.save()
         res.send('Done')
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

router.delete("/job/:id", async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "Job Id can not be empty",
        });
    }

    try {
        let job = await JobModel.findByIdAndDelete(req.params.id);
        res.sendStatus(204);
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

// Update Stats
router.post("/job/:id/:type", async (req, res) => {
    if (!req.params.id || !(req.params.type === "click" || req.params.type === "share")) {
        return res.status(400).send({
            status: 0,
            message: "Job Id can not be empty",
        });
    }

    let body = {};
    if (req.params.type === "click") {
        body = { $inc: { "stats.num_visits": 1 } };
    } else if (req.params.type === "share") {
        body = { $inc: { "stats.num_shares": 1 } };
    }

    try {
        await JobModel.findByIdAndUpdate(req.params.id, body, { new: true });
    } catch (err) {}
    return res.status(200).send({});
});

module.exports = router;
