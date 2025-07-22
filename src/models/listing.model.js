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
      default: "https://assets-news.housing.com/news/wp-content/uploads/2022/03/31010142/Luxury-house-design-Top-10-tips-to-add-luxury-to-your-house-FEATURE-compressed.jpg",
      set: (val) => (val === "" ? undefined : val),
    },
    price: {
      type: Number,
      required: [true, "Price is required."],
      min: [1, "Price must be greater than 0."],
    },
    location: {
      type: String,
      required: [true, "Location is required."],
      trim: true,
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
