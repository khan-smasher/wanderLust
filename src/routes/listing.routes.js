import {Router} from "express";
import { showAllListings, 
    showIndividualListing,
    renderFormForNewListing,
    renderEditForm,
    updateListing,
    deleteListing, 
    createNewListing } from "../controllers/listing.controller.js";

const router = Router();

router.route("/").get(showAllListings);
router.route("/new").get(renderFormForNewListing);
router.route("/create").post(createNewListing);
router.route("/:id/edit").get(renderEditForm);
router.route("/:id/delete").get(deleteListing);
router.route("/:id").patch(updateListing);
router.route("/:id").get(showIndividualListing);

export default router;