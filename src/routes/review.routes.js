import { Router } from "express";
import { validateReviewModel } from "../middlewares/validateModel.middleware.js";
import { reviewOnIndividualListing, deleteReviewFromListing } from "../controllers/review.controller.js";

// ✅ mergeParams to access :id
const router = Router({ mergeParams: true });

// POST /api/v1/listings/:id/reviews
// Validates the review and passes to controller
router.route("/").post(validateReviewModel, reviewOnIndividualListing);
router.route("/:reviewId").delete(deleteReviewFromListing)

export default router;
