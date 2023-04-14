const express = require("express");
const router = express.Router();
const UserModel = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const AuthMiddleware = require("../middlewares/AuthMiddleware");

// SignUp
// @Moqadar
router.post("/user/signup", async (req, res) => {
    const { name, email, password } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            status: 0,
            message: "Name, Email and Password is required",
        });
    }

    let user = await UserModel.findOne({ email: email });
    if (user) {
        return res.status(400).send({
            status: 0,
            message: "This user already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const usertoSave = new UserModel({
        name,
        email,
        password: hashedPassword,
    });
    try {
        let savedUser = {};
        await usertoSave.save((err, user) => {
            if (err) {
                return res.status(400).send({ status: 0, message: "Some error Occured", data: err });
            }
            savedUser = user;
        });

        const token = await jwt.sign({ email: email, role: savedUser["role"] }, "fn32iusht3209hg32263nvh92", { expiresIn: 3600000 });
        return res.status(200).json({ status: 1, message: "Success", data: { token: token, role: savedUser.role } });
    } catch (err) {
        return res.status(500).send({ status: 0, message: err });
    }
});

// Login
// @Moqadar
router.post("/user/login", async (req, res) => {
    const { password, email } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            status: 0,
            message: "Email and Password is required",
        });
    }

    let user = await UserModel.findOne({ email: email });

    if (!user) {
        return res.status(400).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({
            status: 0,
            message: "Invalid credentials",
        });
    }
    const token = await jwt.sign({ email: email, role: user.role }, "fn32iusht3209hg32263nvh92", { expiresIn: 3600000 });

    return res.status(200).json({
        status: 1,
        message: "Success",
        data: { token: token, role: user.role },
    });
});

// Profile
// @RahulSingla
router.get("/user/profile", AuthMiddleware(["admin", "user", "brand"]), async (req, res) => {
    if (!req.user.email) {
        return res.status(500).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    let user = await UserModel.findOne({ email: req.user.email }).populate("company").exec();
    return res.status(200).json({ name: user.name, email: user.email, role: user.role, company: user.company });
});

// Update Profile
// @RahulSingla
router.put("/user/profile", AuthMiddleware(["admin", "user", "brand"]), async (req, res) => {
    if (!req.user.email) {
        return res.status(500).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    let user = await UserModel.findOne({ email: req.user.email });
    if (!user) {
        return res.status(500).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    try {
        await UserModel.findOneAndUpdate({ _id: user._id }, req.body, { new: true });
        return res.status(200).send({ status: 1, message: "Success" });
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err.message,
        });
    }
});

// Update Password
// @RahulSingla
router.put("/user/change_password", AuthMiddleware(["admin", "user", "brand"]), async (req, res) => {
    if (!req.body.currentPassword || !req.body.newPassword) {
        return res.status(500).json({
            status: 0,
            message: "Current and New password are required",
        });
    }
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;

    if (!req.user.email) {
        return res.status(500).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    let user = await UserModel.findOne({ email: req.user.email });
    if (!user) {
        return res.status(500).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    let isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
        return res.status(400).json({
            status: 0,
            message: "Invalid credentials",
        });
    }

    var hashedPassword = await bcrypt.hash(newPassword, 10);

    try {
        await UserModel.findOneAndUpdate({ _id: user._id }, { password: hashedPassword }, { new: true });
        return res.status(200).send({ status: 1, message: "Success" });
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err.message,
        });
    }
});

// Users List
// @RahulSingla
router.get("/user/list", AuthMiddleware(["admin"]), async (req, res) => {
    try {
        let users = await UserModel.find({});
        return res.status(200).send(users);
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err.message,
        });
    }
});

// User View
// @RahulSingla
router.get("/user/:id", AuthMiddleware(["admin"]), async (req, res) => {
    // Validate Request
    if (!req.params.id) {
        return res.status(400).send({
            status: 0,
            message: "User Id can not be empty",
        });
    }

    try {
        let user = await UserModel.findById(req.params.id);
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err.message,
        });
    }
});

// User Profile Update
// @Rahul Singla
router.put("/user/:id", AuthMiddleware(["admin"]), async (req, res) => {
    // Validate Request
    if (!req.params.id || !req.body) {
        return res.status(400).send({
            status: 0,
            message: "User Id can not be empty",
        });
    }

    try {
        let user = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        return res.status(200).send(user);
    } catch (err) {
        return res.status(500).send({
            status: 0,
            message: err.message,
        });
    }
});

module.exports = router;
