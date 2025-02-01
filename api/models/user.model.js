import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false, // Password is optional for OAuth users
    },
    profilePicture: {
        type: String,
        default: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    // bio: {
    //     type: String,
    //     default: '', // Optional bio field with default empty string
    // },
    // institute: {
    //     type: String,
    //     default: '', // Optional institute field with default empty string
    // },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
