import { Router } from "express";
import { renderSignUpPage, registerUser, renderLoginPage, loginUser, logoutUser } from "../controllers/user.controller.js";
import User from "../models/user.model.js";
import passport from "passport";
import { saveRedirectUrl } from "../middlewares/validateUserInfo.middleware.js";

const router = Router();

const passportAuthenticateOptions = passport.authenticate("local", {failureRedirect:'/login', failureFlash: true})

router.route("/signup").get(renderSignUpPage);
router.route("/signup").post(saveRedirectUrl,registerUser);
router.route("/login").get(renderLoginPage);
router.route("/login").post
(saveRedirectUrl,passportAuthenticateOptions, loginUser);
router.route("/logout").get(logoutUser);

export default router;