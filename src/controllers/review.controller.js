import { asyncHandler } from "../utils/asyncHandler.js";
import Review from "../models/review.model.js";
import Listing from "../models/listing.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

// POST handler to create review for specific listing
const reviewOnIndividualListing = asyncHandler(async (req, res) => {
  const listingId = req.params.id;

  //  Fetch the listing by ID
  const listing = await Listing.findById(listingId);

  //  Handle missing listing
  if (!listing) {
    throw new ApiError(404, "Listing not found");
  }

  //  Check if user is authenticated (robust null check)
  if (!req.user || !req.user._id) {
    throw new ApiError(401, "You must be logged in to leave a review.");
  }

  //  Validate review data (optional but good practice)
  if (!req.body.review || !req.body.review.rating || !req.body.review.comment) {
    throw new ApiError(400, "Incomplete review data submitted.");
  }

  //  Create a new review instance and assign author
  const newReview = new Review(req.body.review);
  newReview.author = req.user._id;

  //  Push review to listing's review array
  listing.reviews.push(newReview);

  //  Save both
  await newReview.save();
  await listing.save();

  //  Provide user feedback
  req.flash("success", "New Review Created");
  res.redirect(`/listings/${listing._id}`);
});


const deleteReviewFromListing = asyncHandler(async (req, res) => {
  let {id, reviewId} = req.params;
  
  await Listing.findByIdAndUpdate(id, {$pull : {reviews: reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`)
})


export { reviewOnIndividualListing, deleteReviewFromListing };
