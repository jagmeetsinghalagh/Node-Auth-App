module.exports = (app) => {
    
    app.get('/', (req,res) => {
        res.render('index.ejs');
    });

    app.get('/profile', (req,res) => {
        res.render('profile.ejs',{ user: req.user });
    });
    
};
