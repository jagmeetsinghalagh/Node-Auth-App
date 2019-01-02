const http = require('http');
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/User');
require('./passport');

const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

mongoose.connect(keys.dbURI);

const app = express();

app.set('engine', 'ejs');

app.use(cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [ keys.cookieSecret ]
}));

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app,passport);
require('./routes/routes')(app);

const server = http.createServer(app);
server.listen(PORT, HOST, () => {
    console.log(`Server Started on http://${HOST}:${PORT}`);
});




























