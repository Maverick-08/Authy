import mongoose from 'mongoose';

const playerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        default: null 
    },
    position: {
        type: String,
        required: true
    },
    ppg: {
        type: Number,
        default: null 
    },
    rpg: {
        type: Number,
        default: null 
    },
    apg: {
        type: Number,
        default: null 
    }
}, {
    timestamps: true,
    collection: 'players' 
});

export const Players = mongoose.model('Players', playerSchema);
