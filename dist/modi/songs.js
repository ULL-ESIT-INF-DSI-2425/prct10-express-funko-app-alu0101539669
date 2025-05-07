import { model, Schema } from 'mongoose';
const SongSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    album: {
        type: String,
        trim: true,
    },
    genre: {
        type: String,
        trim: true,
    },
    duration: {
        type: Number,
        required: true,
        validate: (value) => {
            if (value <= 0) {
                throw new Error('Duration must be a positive number');
            }
        },
    },
});
export const Song = model('Song', SongSchema);
