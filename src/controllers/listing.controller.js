// Importing utilities and models
import { asyncHandler } from "../utils/asyncHandler.js"; // Handles async errors in routes
import { ApiResponse } from "../utils/ApiResponse.js";    // Utility to format API responses (not used here, can be useful later)
import { ApiError } from "../utils/ApiError.js";          // Custom error class for API errors
import Listing from "../models/listing.model.js";         // Mongoose model for Listings
import Review from "../models/review.model.js";           // Mongoose model for Reviews

// GET /api/v1/listings
// Fetches and displays all listings
const showAllListings = asyncHandler(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

// GET /api/v1/listings/:id
// Fetch and show a specific listing with its reviews
const showIndividualListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews"); // Populate reviews from Review model
  res.render("listings/show", { listing });
});

// GET /api/v1/listings/new
// Renders form for creating a new listing
const renderFormForNewListing = asyncHandler(async (req, res) => {
  res.render("listings/new");
});

// POST /api/v1/listings
// Creates a new listing and saves to database
const createNewListing = asyncHandler(async (req, res, next) => {
  console.log(req.body);

  // Basic validation
  if (!req.body.listing) {
    throw new ApiError(400, "Send valid data for listing");
  }

  // Creating and saving new listing
  const newListing = new Listing(req.body.listing);
  await newListing.save();

  // Redirect to the newly created listing's page
  res.redirect(`/api/v1/listings/${newListing._id}`);
});

// GET /api/v1/listings/:id/edit
// Renders the edit form for a listing
const renderEditForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

// PATCH /api/v1/listings/:id
// Updates a listing with new data
const updateListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = req.body.listing;

  // Validate update data
  if (!updatedData) {
    return next(new ApiError(400, "No data submitted"));
  }

  // Find listing by ID and update it
  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,             // Return updated document
    runValidators: true,   // Validate before saving
  });

  if (!updatedListing) {
    throw new ApiError(404, "Listing not found");
  }

  // Redirect to updated listing page
  res.redirect(`/api/v1/listings/${updatedListing._id}`);
});

// DELETE /api/v1/listings/:id
// Deletes a listing from the database
const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Optional: log the listing being deleted
  const listingToDelete = await Listing.findById(id);
  console.log(`This listing is going to be deleted:\n`, listingToDelete);

  await Listing.findByIdAndDelete(id);
  console.log("Successfully Deleted");

  res.redirect(`/api/v1/listings/`);
});

// Export all controller functions
export {
  showAllListings,
  showIndividualListing,
  renderFormForNewListing,
  createNewListing,
  renderEditForm,
  updateListing,
  deleteListing,
};
