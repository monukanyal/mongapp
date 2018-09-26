var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Name: { type: String, index: true },
    email: { type: String, unique: true, index: true },
    password: { type: String, index: true },
    logintype: { type: String, index: true },
    Book: [
        { type: mongoose.Schema.ObjectId, ref: 'Book' }
    ],
    createdAt: { type: Date, index: true, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);

