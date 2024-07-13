import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    notifications: {
        type: Array,
        default: []
    }
}, {
    timestamps: true,
    collection: "Notifications"
})

export const Notifications = mongoose.model("Notifications",notificationSchema);