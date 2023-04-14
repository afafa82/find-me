const express = require("express");
const router = express.Router();
const multer = require("multer");
const slugify = require("slugify");

// Configuration for Multer
const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../../frontend/public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        const fileName = slugify(file.originalname.split(".")[0], { lower: true, strict: true });
        cb(null, `assets/files/${fileName}-${Date.now()}.${ext}`);
    },
});

// Multer Filter
const multerFilter = (req, file, cb) => {
    if (file.mimetype === "application/pdf" || file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new Error("Not a PDF or Image File !!!"), false);
    }
};

// Calling the Multer Function
const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

// Endpoint
router.post("/uploadFile", upload.single("myFile"), async (req, res) => {
    try {
        res.status(200).send({ status: 1, message: "Success", data: { filename: req.file.filename } });
    } catch (err) {
        res.status(500).send({
            status: 0,
            message: err,
        });
    }
});

module.exports = router;
