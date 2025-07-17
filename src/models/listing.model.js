import mongoose from "mongoose";

const Schema = mongoose.Schema;

const listingSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required."],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required."],
      trim: true,
    },
    image: {
      type: String,
      default: "https://www.pexels.com/photo/beige-bungalow-house-259588/",
      set: (val) => (val === "" ? undefined : val),
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [1, "Price must be greater than 0."],
    },
    location: {
      type: String,
      set: (val) => (val === "" ? undefined : val),
    },
    country: {
      type: String,
      default: "India",
      set: (val) => (val === "" ? undefined : val),
    },
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
