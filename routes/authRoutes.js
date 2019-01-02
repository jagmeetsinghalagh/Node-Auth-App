module.exports = (app,passport) => {

    app.get('/auth/google', passport.authenticate('google',{
        scope: [ 'profile', 'email']
    }));
    
    app.get('/auth/google/callback',passport.authenticate('google'), (req,res) => {
        res.redirect('/profile');
    });

    app.get('/logout', (req,res) => {
        req.logout();
        res.redirect('/');
    });
}




