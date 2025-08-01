import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import User from "../models/user.model.js";
import passport from "passport";

const renderSignUpPage = asyncHandler(async (req, res) => {
  res.render("users/signup.ejs");
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;

  // Basic validation
  if (!username || !email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  try {
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    req.login(registeredUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to WanderLust!");
      return res.redirect("/listings");
    });
  } catch (err) {
    // Handle duplicate user error from passport-local-mongoose
    if (err.name === "UserExistsError") {
      req.flash("error", err.message);
      return res.redirect("/signup"); // ✅ Don't throw after redirect
    }

    // For unknown errors, optionally log it and show user-friendly message
    console.error("Registration error:", err);
    req.flash("error", "Something went wrong during registration.");
    return res.redirect("/signup"); // ✅ Still redirect, but you could also show an error page
  }
});

const renderLoginPage = asyncHandler(async (req, res) => {
  res.render("users/login.ejs");
});

const loginUser = asyncHandler(async (req, res) => {
  req.flash(
    "success",
    "Welcome back to WanderLust! You are successfully logged in!"
  );
  const redirectUrl = res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
});

const logoutUser = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", "You are logged out successfully!");
    res.redirect("/listings");
  });
});

export {
  renderSignUpPage,
  registerUser,
  renderLoginPage,
  loginUser,
  logoutUser,
};
