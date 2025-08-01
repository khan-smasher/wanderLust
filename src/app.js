import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import { ApiError } from "./utils/ApiError.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import LocalStrategy from "passport-local";
import User from "./models/user.model.js"
import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

// Importing Routes
import listingRouter from "./routes/listing.routes.js";
import reviewRouter from "./routes/review.routes.js";
import userRouter from "./routes/user.routes.js";

// Setting up __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create express app
const app = express();

// Middleware setup
app.use(methodOverride("_method")); // Allows using PUT/DELETE via ?_method
app.use(express.json());            // Parse incoming JSON
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser());


// View engine setup
app.engine("ejs", ejsMate); // Use ejs-mate for layouts/partials
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views")); // Set views directory

const sessionOptions = {
  secret: "supersecret",
  resave: false,
  saveUninitialized: true,
};


// Serve static files from /public folder
app.use(express.static(path.join(__dirname, "../public")));

// Home route (just a placeholder)
app.get("/api/v1/", (req, res) => res.send("Home"));

app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});


// Use imported routers
app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter); // Nested review route
app.use("/", userRouter);

// ⚠️ Catch-all unknown route
app.all("/{*splat}", (req, res, next) => {
  next(new ApiError(404, `Page not found - ${req.originalUrl}`));
});

// Global error handler
app.use(errorHandler);

export { app };
