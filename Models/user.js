var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    Name: { type: String, index: true },
    email: { type: String, unique: true, index: true },
    password: { type: String },
    logintype: { type: String, index: true },
    Book: [
        { type: mongoose.Schema.ObjectId, ref: 'Book' }
    ],
    createdAt: { type: Date, default: Date.now }
});
//UserSchema.index({email: 1, logintype: 1});
module.exports = mongoose.model('User', UserSchema);

