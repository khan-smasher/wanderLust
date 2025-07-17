import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Listing from "../models/listing.model.js";

const showAllListings = asyncHandler(async (req, res) => {
  const allListings = await Listing.find({});
    res.render("listings/index", {allListings})
});

const showIndividualListing = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show", {listing})

});

const renderFormForNewListing = asyncHandler(async (req, res) => {
    res.render("listings/new")
})

const createNewListing = asyncHandler(async (req, res) => {
    const { title, description, image, price, location, country } = req.body;

    const newListing = await Listing.create({
        title,
        description,
        image,
        price,
        location,
        country
    });

    res.redirect(`/api/v1/listings/${newListing._id}`);
})

const renderEditForm = asyncHandler(async (req, res) => {
    const {id} = req.params;
    const listing = await Listing.findById(id);
   res.render("listings/edit", { listing }) 
});

const updateListing = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    req.body,
    { new: true, runValidators: true }
  );

  res.redirect(`/api/v1/listings/${updatedListing._id}`);
});

const deleteListing = asyncHandler(async (req, res) => {
    const {id} = req.params;
    console.log(`This listing is going to be deleted: \n${Listing.findById(id)}`);
    await Listing.findByIdAndDelete(id);
    console.log("Successfully Deleted");
    res.redirect(`/api/v1/listings/`);
})

export { 
    showAllListings,
    showIndividualListing,
    renderFormForNewListing,
    createNewListing,
    renderEditForm,
    updateListing,
    deleteListing
 };
