import {Router} from "express";
import { showAllListings, 
    showIndividualListing,
    renderFormForNewListing,
    renderEditForm,
    updateListing,
    deleteListing, 
    createNewListing } from "../controllers/listing.controller.js";
import { validateListing } from "../middlewares/validateListing.middleware.js";

const router = Router();

router.route("/").get(showAllListings);
router.route("/new").get(renderFormForNewListing);
router.route("/").post(validateListing, createNewListing); 

router.route("/:id/edit").get(renderEditForm);
router.route("/:id").get(showIndividualListing);
router.route("/:id").patch(validateListing, updateListing);
router.route("/:id").delete(deleteListing);

export default router;
