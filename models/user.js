var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true},
	email: { type: String, required: true, unique: true },
	firstName: String,
	lastName: String,
	createdAt: Date,
	profilePicId: String,
	profilePicFormat: String,
	resetPasswordToken: String,
    resetPasswordExpires: Date,
    signupToken : String,
    emailVerified: Boolean,
    followers: Number
});