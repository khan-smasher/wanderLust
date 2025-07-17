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
router.route("/").post(createNewListing); // form posts to "/"

router.route("/:id/edit").get(renderEditForm);
router.route("/:id").get(showIndividualListing);
router.route("/:id").patch(updateListing);
router.route("/:id").delete(deleteListing);

export default router;
