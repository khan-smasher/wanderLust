import { ApiError } from "../utils/ApiError.js";

// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  console.error("💥 Global Error Handler:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";
  const error = err;

  // Check if the client expects HTML (browser) or JSON (API request)
  if (req.accepts("html")) {
    // Render the error.ejs page
    return res.status(statusCode).render("error", {
      statusCode,
      message,
      error
    });
  }

  // Otherwise, send JSON (for API clients)
  return res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || {},
  });
};

export { errorHandler };
