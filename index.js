// backend/index.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "./routes/auth.js";
import googleroute from "./routes/googleroute.js";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "passport";
import "./config/googleAuth.js";




const app = express();
const PORT = 5000;




app.use(cors({
origin: isProduction
    ? "https://iiitkota-auditorium-booking.vercel.app"
    : "http://localhost:5173",
}));


app.use(express.json());
app.use(cookieParser());


// Session (Required for passport)
app.use(
  session({
    secret: "your12345jwt12345secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/api/auth", googleroute);
app.use("/api/users", userRoutes);




// ✅ MongoDB connect
mongoose
  .connect("mongodb+srv://IIITK:IIITKAB@cluster0.r1exb.mongodb.net/saral", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB Connected");
    app.listen(PORT, () => console.log(`🚀 Bun backend running on port ${PORT}`));
  })
  .catch((err) => console.error("❌ DB Error:", err));





