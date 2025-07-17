import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Listing from "../models/listing.model.js";

const showAllListings = asyncHandler(async (req, res) => {
  const list = await Listing.find({});
  console.log(list);
  res
    .status(200)
    .json(new ApiResponse(200, list, "All listings fetched successfully"));
});

export { showAllListings };
