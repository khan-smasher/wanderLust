import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";


// routes import
import listingRouter from "./routes/listing.routes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(methodOverride("_method"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// set base route
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
