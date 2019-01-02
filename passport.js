const passport = require('passport');
const mongoose = require('mongoose');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = mongoose.model('users');
const keys = require('./config/keys');


// serialize user into session
passport.serializeUser( (user,done) => {
    done(null,user.id);
});

// deserialize user from the session
passport.deserializeUser( (id,done) => {
    User.findById(id)
        .then( (user) => {
            done(null,user);
        });
});



// google strategy for authentication
passport.use(
    new GoogleStrategy({
        clientID: keys.clientID,
        clientSecret: keys.clientSecret,
        callbackURL: '/auth/google/callback'
    },
    (accessToken,refreshToken,profile,done) => {
        User.findOne({ 'google.googleId': profile.id})
        .then( (exsistingUser) => {
            if(exsistingUser){
                done(null,exsistingUser);
            } else {
                new User({
                    'google.googleId': profile.id,
                    'google.token': accessToken,
                    'google.name': profile.displayName,
                    'google.email': profile.emails[0].value
                })
                .save()
                .then( (user) => {
                    done(null,user);
                }); 
            }
        });
    })
);