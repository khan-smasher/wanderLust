// Importing Router from Express
import { Router } from "express";

// Middleware to validate review model structure
import { validateReviewModel } from "../middlewares/validateModel.middleware.js";

// Controllers to handle review logic
import {
  reviewOnIndividualListing,
  deleteReviewFromListing,
} from "../controllers/review.controller.js";

import { isLoggedIn, isOwner, saveRedirectUrl, isReviewAuthor } from "../middlewares/validateUserInfo.middleware.js";

// ✅ Using mergeParams to access `:id` from parent route (e.g., listings/:id/reviews)
const router = Router({ mergeParams: true });

// Route to handle POST request for creating a review on a specific listing
// URL: POST /api/v1/listings/:id/reviews
// Middleware: validateReviewModel ensures the review has valid structure
router.route("/").post(isLoggedIn,validateReviewModel, reviewOnIndividualListing);

// Route to delete a specific review from a listing
// URL: DELETE /api/v1/listings/:id/reviews/:reviewId
router.route("/:reviewId").delete(isLoggedIn,isReviewAuthor,deleteReviewFromListing);

// Exporting the router to be used in the main app
export default router;
