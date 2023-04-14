const mongoose = require("mongoose");
const slug = require("mongoose-slug-generator");
const mongoosePaginate = require("mongoose-paginate-v2");
mongoose.plugin(slug);
mongoose.plugin(mongoosePaginate);

const AccommodationSchema = new mongoose.Schema({
  title: { type: String, required: "Title is required" },
  slug: { type: String, slug: "title" },
  description: { type: String, required: "Description is required" },
  housing_type: {
    type: String,
    enum: ["apartment", "condo", "house", "private_room", "shared_room"],
    default: "apartment",
  },
  image: [{ type: String, required: "Image is required" }],
  address: {
    street: { type: String, required: "Street is required" },
    city: { type: String, required: "City is required" },
    postal_code: { type: String, required: "Postal code is required" },
    province: {
      type: String,
      enum: [
        "Alberta",
        "Ontario",
        "Quebec",
        "Nova Scotia",
        "New Brunswick",
        "Manitoba",
        "British Columbia",
        "Prince Edward Islands",
        "Saskatchewan",
        "Newfoundland and Labrador",
      ],
      required: "Province is required",
    },
    country: { type: String, enum: ["Canada"] },
  },
  accommodation_cost: { type: String },
  utilites_cost: {
    hydro: { type: String, default: "0" },
    heat: { type: String, default: "0" },
    electricity: { type: String, default: "0" },
    internet: { type: String, default: "0" },
    parking: { type: String, default: "0" },
  },
  requirements: {
    lease: { type: Boolean, default: false },
    credit: { type: Boolean, default: false },
    references: { type: Boolean, default: false },
    advancerent: { type: Boolean, default: false },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  contact: {
    email: { type: String, required: "Email is required" },
    phone: { type: String, required: "Phone number is required" },
  },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
});

const Accommodation = mongoose.model("Accommodation", AccommodationSchema);
module.exports = Accommodation;
