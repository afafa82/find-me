const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, maxlength: 255, required: true },
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: "Email address is required",
            validate: {
                validator: function (v) {
                    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
                },
                message: "Email address should be valid",
            },
        },
        password: { type: String, required: true },
        role: { type: String, enum: ["user", "admin", "brand"], required: true, default: "user" },
        accommodations: [{ type: mongoose.Schema.Types.ObjectId, ref: "Accommodation" }],
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company", default: null },
    },
    { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
