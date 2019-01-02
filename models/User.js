const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    google: {
        googleId: String,
        token: String,
        email: String,
        name: String
    }
});

mongoose.model('users', userSchema);