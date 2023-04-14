const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
mongoose.plugin(mongoosePaginate);

const CompanySchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, unique: true, slug: "name" },
        description: { type: String },
        logo: { type: String, default: "" },
        is_jobs: { type: Boolean, default: 0 },
        is_deals: { type: Boolean, default: 0 },
        deals: [{ type: mongoose.Schema.Types.ObjectId, ref: "Deal" }],
        jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }],
    },
    { timestamps: true }
);

const Company = mongoose.model("Company", CompanySchema);
module.exports = Company;
