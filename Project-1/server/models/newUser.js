import mongoose, { Schema } from "mongoose";

const newUserSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: "User"
    },
    refreshToken: String,
    requestingAccess:{
        type: String,
        default: null
    }
}, { 
    timestamps: true,
    collection: 'Users'  // This will set the collection name to 'Users'
});

export const Users = mongoose.model('User', newUserSchema);
