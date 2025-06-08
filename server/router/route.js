import { Router } from "express";
import {
  register,
  registerMail,
  authenticate,
  login,
  createResetSession,
  generateOTP,
  getUser,
  verifyOPT,
  resetPassword,
  updateUser,
} from "../controllers/index.js";
import { verifyUser, auth, localVariables } from "../middlewares/z_index.js";

export const router = Router();

/*#############   POST ROUTES   #############*/
router.route("/register").post(register);
router.route("/login").post(verifyUser, login);
router.route("/registerMail").post(registerMail);
router.route("/authenticate").post(authenticate);

/*#############   GET ROUTES   #############*/
router.route("/user/:username").get(getUser);
router.route("/generateOTP").get(verifyUser, localVariables, generateOTP);
router.route("/verifyOPT").get(verifyOPT);
router.route("/createResetSession").get(createResetSession);

/*#############   PUT ROUTES   #############*/
router.route("/updateUser").put(auth, updateUser);
router.route("/resetPassword").put(verifyUser, resetPassword);
