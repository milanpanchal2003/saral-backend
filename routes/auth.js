// route/auth.js
import express from "express";
import Contact from "../models/Contact.js";
import verifyToken from "../middleware/verifyToken.js";
import jwt from "jsonwebtoken";


const router = express.Router();




router.post("/contact", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newUser = new Contact({ name, email, message });
    await newUser.save();

    res.status(201).json({ message: "Thank You" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already registered" });
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});




router.post("/login", async (req, res) => {
  const { email, password } = req.body;




  try {
    const user = await User.findOne({ email });




    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }


    const token = jwt.sign({ _id: user._id }, "your123jwt123secret", { expiresIn: "1d" });


    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }


    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // true in production (HTTPS)
        sameSite: "lax", // or "None" if using cross-origin with credentials
    });


    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error("❌ Login Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


router.get("/checkauth", verifyToken, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password"); //  Password Exclude Karo
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
     
        res.json(
            {
             name: user.name,
             email: user.email,                    
             _id: user._id
            }
         );
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});


// ✅ LOGOUT ROUTE
router.get("/logout", (req, res) => {
  // Passport logout
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }


    // Destroy session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to destroy session" });
      }


      // Clear cookies
      res.clearCookie("token", {
        path: "/",
      });


      res.clearCookie("connect.sid", {
        path: "/", // ✅ very important
        httpOnly: true,
        sameSite: "Lax", // or "None" if using cross-site cookies
        secure: false, // ✅ Set true only if you're on https
      });


      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});




export default router;



