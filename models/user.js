var mongoose = require('mongoose');

module.exports = mongoose.model('User',{
	id: String,
	username: { type: String, required: true, unique: true },
	password: { type: String, required: true, unique: true },
	email: { type: String, required: true },
	firstName: String,
	lastName: String,
	profilePicId: String,
	profilePicFormat: String,
	resetPasswordToken: String,
  resetPasswordExpires: Date
});