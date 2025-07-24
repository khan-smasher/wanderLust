import { asyncHandler } from "../utils/asyncHandler.js";
import Review from "../models/review.model.js";
import Listing from "../models/listing.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// POST handler to create review for specific listing
const reviewOnIndividualListing = asyncHandler(async (req, res) => {
  // Find listing by ID passed in URL parameter
  const listing = await Listing.findById(req.params.id);

  // Error if listing not found
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  // Create new Review object from submitted form data
  const newReview = new Review(req.body.review);

  // Add review to listing's reviews array
  listing.reviews.push(newReview);

  // Save both review and updated listing
  await newReview.save();
  await listing.save();

  // Redirect to listing detail page
  res.redirect(`/api/v1/listings/${listing._id}`);
});

const deleteReviewFromListing = asyncHandler(async (req, res) => {
  let {id, reviewId} = req.params;
  
  await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);

  res.redirect(`/api/v1/listings/${id}`)
})


export { reviewOnIndividualListing, deleteReviewFromListing };
