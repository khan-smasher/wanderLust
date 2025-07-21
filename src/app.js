import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";

// Routes
import listingRouter from "./routes/listing.routes.js";

// Setup __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();

// Setup method-override and body parsing
app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Serve static files from public folder
app.use(express.static(path.join(__dirname, "../public"))); // ✅ Correct path

// Use router
app.get("/api/v1/", (req, res) => res.send("Home"));
app.use("/api/v1/listings", listingRouter);


// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

export { app };
