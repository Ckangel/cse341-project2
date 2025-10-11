const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id); // Serialize user ID to session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Find user by ID in DB
    done(null, user); // Attach user object to request as req.user
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK, // Use callback from env for flexibility
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Look for existing user with GitHub ID
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          // Create new user if not found
          user = new User({
            githubId: profile.id,
            displayName: profile.displayName || profile.username,
            firstName: profile._json?.name?.split(" ")[0] || "",
            lastName: profile._json?.name?.split(" ").slice(1).join(" ") || "",
            email: profile.emails?.[0]?.value || "",
            role: "user", // Default role
          });
          await user.save();
        }
        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

module.exports = passport;
