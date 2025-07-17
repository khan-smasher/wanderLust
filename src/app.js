import express from "express";

// routes import
import listingRouter from "./routes/listing.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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
