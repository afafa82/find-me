const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
mongoose.plugin(mongoosePaginate);

const JobSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        reference_id: { type: String },
        valid_from: { type: Date, required: true },
        valid_till: { type: Date, required: true },
        time_type: { type: String, enum: ["part-time", "full-time", "choice"] },
        num_positions: { type: Number, default: 1, integer: true },
        salary: { type: Number },
        salary_type: { type: String, enum: ["hour", "month", "year"] },
        description: { type: String },
        requirements: { type: String },
        benefits: { type: String },
        is_remote: { type: String, enum: ["yes", "no", "temp"] },
        address: {
            street: { type: String },
            city: { type: String },
            postal_code: { type: String },
            province: { type: String, enum: ["Alberta", "Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Manitoba", "British Columbia", "Prince Edward Islands", "Saskatchewan", "Newfoundland and Labrador"] },
            country: { type: String, enum: ["Canada"], default: "Canada" },
        },
        apply_type: { type: String, enum: ["email", "url"] },
        apply_value: { type: String },
        company: { type: mongoose.Schema.Types.ObjectId, ref: "Company" },
        stats: {
            num_visits: { type: Number, default: 0 },
            num_shares: { type: Number, default: 0 },
        },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
    },
    { timestamps: true }
);

const Job = mongoose.model("Job", JobSchema);
module.exports = Job;
