import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "https://www.pexels.com/photo/beige-bungalow-house-259588/",
    },
    price: {
      type: Number,
      min: 0,
    },
    location: {
      type: String,
    },
    country: {
      type: String,
      default: "India",
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);


export default Listing;
