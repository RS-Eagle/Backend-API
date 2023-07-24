import express from "express";

import { getAllusers, login, logout, newUser } from "../controller/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getuser", isAuthenticated, getAllusers);

router.post("/register", newUser);
router.post("/login", login);
router.get("/logout", logout);

export default router;
