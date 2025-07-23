import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import { ApiError } from "./utils/ApiError.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// Importing Routes
import listingRouter from "./routes/listing.routes.js";
import reviewRouter from "./routes/review.routes.js";

// Setting up __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// Middleware setup
app.use(methodOverride("_method")); // Allows using PUT/DELETE via ?_method
app.use(express.json());            // Parse incoming JSON
app.use(express.urlencoded({ extended: true })); // Parse form data

// View engine setup
app.engine("ejs", ejsMate); // Use ejs-mate for layouts/partials
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Set views directory

// Serve static files from /public folder
app.use(express.static(path.join(__dirname, "../public")));

// Home route (just a placeholder)
app.get("/api/v1/", (req, res) => res.send("Home"));

// Use imported routers
app.use("/api/v1/listings", listingRouter);
app.use("/api/v1/listings/:id/reviews", reviewRouter); // Nested review route

// ⚠️ Catch-all unknown route
app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(404, `Page not found - ${req.originalUrl}`));
});

// Global error handler
app.use(errorHandler);

export { app };
