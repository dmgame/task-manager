import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	login: { type: String },
	password: { type: String },
});

const User = mongoose.model('User', UserSchema);





