// src/strategies/googleStrategy.js
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const config = require('../config');

/**
 * Create Google OAuth strategy for Passport
 * @param {Object} AuthUser - Sequelize AuthUser model
 */
const createGoogleStrategy = (AuthUser) => {
    return new GoogleStrategy(
        {
            clientID: config.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE_CLIENT_SECRET,
            callbackURL: config.GOOGLE_CALLBACK_URL,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                // Check if user exists
                let user = await AuthUser.findOne({ where: { googleId: profile.id } });

                if (!user) {
                    // Check if user exists with same email
                    user = await AuthUser.findOne({ where: { email: profile.emails[0].value } });

                    if (user) {
                        // Link Google account to existing user
                        user.googleId = profile.id;
                        user.name = user.name || profile.displayName;
                        user.picture = user.picture || profile.photos[0]?.value;
                        user.isVerified = true;
                        await user.save();
                    } else {
                        // Create new user
                        user = await AuthUser.create({
                            googleId: profile.id,
                            email: profile.emails[0].value,
                            name: profile.displayName,
                            picture: profile.photos[0]?.value,
                            isVerified: true,
                        });
                    }
                }

                return done(null, user);
            } catch (error) {
                return done(error, null);
            }
        }
    );
};

module.exports = { createGoogleStrategy };
