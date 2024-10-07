import express from "express";
import { getProfile, login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { Upload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(Upload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").put(isAuthenticated,Upload,updateProfile);
router.route('/profile').get(isAuthenticated, getProfile); 

export default router;

