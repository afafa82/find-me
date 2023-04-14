const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
mongoose.plugin(mongoosePaginate);

const GuideSchema = new mongoose.Schema(
    {
        title: { type: String, required: "Guide Title is required" },
        slug: { type: String, unique: true, slug: "title" },
        image: { type: String },
        description: { type: String, required: "Guide Content is required" },
        author_name: { type: String, default: "SHS" },
        stats: {
            num_visits: { type: Number, default: 0 },
            num_shares: { type: Number, default: 0 },
        },
    },
    { timestamps: true }
);

const Guide = mongoose.model("Guide", GuideSchema);
module.exports = Guide;
