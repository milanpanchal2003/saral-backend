import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
const router = express.Router();


const FRONTEND_URL = process.env.NODE_ENV === "production"
  ? "https://your-production-frontend.com"
  : "http://localhost:5173"; // Vite default


// 1. Google login start
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}));




// 2. Callback
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: `${FRONTEND_URL}/login` }),
  (req, res) => {
    const user = req.user;


    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );


    // Set cookie and redirect
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });


    res.redirect(`${FRONTEND_URL}/dashboard`);
  }
);


export default router;



