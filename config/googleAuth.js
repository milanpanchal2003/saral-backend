// config/googleAuth.js
// install packege
// bun add express passport passport-google-oauth20 express-session cors mongoose dotenv




import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/Contact.js";


import dotenv from "dotenv";
dotenv.config();


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.LCLIENT_ID,
      clientSecret: process.env.LCLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });


        if (!user) {
          user = await User.create({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "google-oauth",
            role: "student",
          });
        }


        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});



