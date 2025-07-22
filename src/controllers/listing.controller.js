import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Listing from "../models/listing.model.js";
import { ApiError } from "../utils/ApiError.js";

const showAllListings = asyncHandler(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index", { allListings });
});

const showIndividualListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show", { listing });
});

const renderFormForNewListing = asyncHandler(async (req, res) => {
  res.render("listings/new");
});

const createNewListing = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  if (!req.body.listing){
    throw new ApiError(400, "Send valid data for listing");
  }

  const newListing = new Listing(req.body.listing);
  await newListing.save();

  res.redirect(`/api/v1/listings/${newListing._id}`);
});

const renderEditForm = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit", { listing });
});

const updateListing = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const updatedData = { ...req.body };

  if (updatedData.price) {
    updatedData.price = Number(updatedData.price);
    if (isNaN(updatedData.price)) {
      return next(
        new ApiError(400, "Invalid data type", {
          price: `Invalid value for price: ${req.body.price}`,
        })
      );
    }
  }

  const updatedListing = await Listing.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  res.redirect(`/api/v1/listings/${updatedListing._id}`);
});

const deleteListing = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const listingToDelete = await Listing.findById(id);
  console.log(`This listing is going to be deleted:\n`, listingToDelete);
  await Listing.findByIdAndDelete(id);
  console.log("Successfully Deleted");
  res.redirect(`/api/v1/listings/`);
});

export {
  showAllListings,
  showIndividualListing,
  renderFormForNewListing,
  createNewListing,
  renderEditForm,
  updateListing,
  deleteListing,
};
