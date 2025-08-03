// Importing necessary modules and functions
import { Router } from "express";

// Importing listing controller functions to handle route logic
import {
  showAllListings,
  showIndividualListing,
  renderFormForNewListing,
  renderEditForm,
  updateListing,
  deleteListing,
  createNewListing,
} from "../controllers/listing.controller.js";

// Importing middleware to validate listing data before creating or updating
import {
  validateListingModel,
} from "../middlewares/validateModel.middleware.js";

import { isLoggedIn, isOwner, saveRedirectUrl } from "../middlewares/validateUserInfo.middleware.js";
import multer from "multer";
import { storage } from "../../cloudConfig.js";

const upload = multer({storage})

// Creating a new Express router
const router = Router();

/**
 * Route: GET /
 * Description: Show all listings
 * Controller: showAllListings
 */
router.route("/").get(showAllListings);

/**
 * Route: GET /new
 * Description: Render form to create a new listing
 * Controller: renderFormForNewListing
 */
router.route("/new").get(isLoggedIn,renderFormForNewListing);

/**
 * Route: POST /
 * Description: Create a new listing
 * Middleware: validateListingModel - validates listing data
 * Controller: createNewListing
 */
router.route("/").post(isLoggedIn,validateListingModel, upload.single('listing[image]'), createNewListing);

/**
 * Route: GET /:id/edit
 * Description: Render form to edit an existing listing
 * Controller: renderEditForm
 */
router.route("/:id/edit").get(isLoggedIn,isOwner,renderEditForm);

/**
 * Route: GET /:id
 * Description: Show details of a specific listing by ID
 * Controller: showIndividualListing
 */
router.route("/:id").get(showIndividualListing);

/**
 * Route: PATCH /:id
 * Description: Update a specific listing
 * Middleware: validateListingModel - validates updated data
 * Controller: updateListing
 */
router.route("/:id").patch(isLoggedIn,isOwner,validateListingModel, updateListing);

/**
 * Route: DELETE /:id
 * Description: Delete a specific listing
 * Controller: deleteListing
 */
router.route("/:id").delete(isLoggedIn,isOwner,deleteListing);

// Export the configured router for use in the main app
export default router;
