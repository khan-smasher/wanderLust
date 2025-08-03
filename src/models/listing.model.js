import mongoose from "mongoose";
import Review from "./review.model.js";

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
      url: String,
      filename: String,
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
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      }
    ],
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    }
  },
  { timestamps: true }
);

listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id: {$in: listing.reviews}})
  }
})


const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
