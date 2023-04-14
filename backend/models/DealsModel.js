const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
mongoose.plugin(mongoosePaginate);

const DealSchema = new mongoose.Schema(
    {
        title: { type: String, required: "Deal title is required" },
        slug: { type: String, slug: "title" },
        description: { type: String, required: "Deal description is required" },
        image: [{ type: String, required: "Deal Image is required" }],
        category: { type: String, enum: ["Accommodation", "Beauty and Health", "Clothing", "Education", "Electronics", "Entertainment", "Food and Drinks", "Galleries, Museums", "Services", "Sports", "Travel", "Others"], required: true },
        link: { type: String, required: true },
        valid_from: { type: Date, required: true },
        valid_till: { type: Date, required: true },
        locations: [
            {
                street: { type: String },
                city: { type: String },
                postal_code: { type: String },
                province: { type: String, enum: ["Alberta", "Ontario", "Quebec", "Nova Scotia", "New Brunswick", "Manitoba", "British Columbia", "Prince Edward Islands", "Saskatchewan", "Newfoundland and Labrador"] },
                country: { type: String, enum: ["Canada"] },
            },
        ],
        offer_type: { type: String, enum: ["discount", "free"], default: "discount" },
        avail_type: { type: String, enum: ["online", "instore"], default: "online" },
        conditions: { type: String },
        steps_to_avail: { type: String },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        stats: {
            num_visits: { type: Number, default: 0 },
            num_clicks: { type: Number, default: 0 },
            num_shares: { type: Number, default: 0 },
            num_wishlist: { type: Number, default: 0 },
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Company",
        },
        reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "DealReview" }],
    },
    { timestamps: true }
);

const DealReviewSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        deal_id: { type: mongoose.Schema.Types.ObjectId, ref: "Deal" },
        body: { type: String, maxlength: 1024 },
        rating: { type: Number, max: 5, min: 1, required: true },
    },
    { timestamps: true }
);

const Deal = mongoose.model("Deal", DealSchema);
const DealReview = mongoose.model("DealReview", DealReviewSchema);

module.exports = {
    DealModel: Deal,
    DealReviewModel: DealReview,
};
