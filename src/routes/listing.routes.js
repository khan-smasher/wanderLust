import {Router} from "express";
import { showAllListings } from "../controllers/listing.controller.js";

const router = Router();

router.route("/").get(showAllListings)


export default router;