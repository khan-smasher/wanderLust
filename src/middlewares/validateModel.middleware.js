import {
  listingSchema,
  reviewSchmea,
} from "../validations/schema.validation.js";
import { ApiError } from "../utils/ApiError.js";

const validateListingModel = (req, res, next) => {
  const { error } = listingSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((e) => e.message).join(", ");
    return next(new ApiError(400, messages));
  }
  next();
};

const validateReviewModel = (req, res, next) => {
  const { error } = reviewSchmea.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((e) => e.message).join(", ");
    return next(new ApiError(400, messages));
  }
  next();
};

export { validateListingModel, validateReviewModel };
