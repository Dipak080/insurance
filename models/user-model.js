const mongoose = require('mongoose');

// Create a schema for User
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,       
    },
    email: {
        type: String,
        required: true,        
        match: [/.+\@.+\..+/, 'Please fill a valid email address']
    },   
});

const User = mongoose.model('User', userSchema);

module.exports = User;
