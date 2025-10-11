const passport = require("passport");
const GitHubStrategy = require("passport-github").Strategy;
const User = require("../models/userModel");

passport.serializeUser((user, done) => {
  done(null, user.id); // Save user ID to session
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id); // Retrieve user from DB
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL, // Use env variable
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ githubId: profile.id });
        if (!user) {
          user = new User({
            githubId: profile.id,
            displayName: profile.displayName || profile.username,
            firstName: profile._json?.name?.split(" ")[0] || "",
            lastName: profile._json?.name?.split(" ").slice(1).join(" ") || "",
            email: profile.emails?.[0]?.value || "",
            role: "user",
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

module.exports = passport;
