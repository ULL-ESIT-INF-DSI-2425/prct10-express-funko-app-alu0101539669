import { Document, model, Schema } from 'mongoose';

interface SongDocumentInterface extends Document {
  title: string;
  artist: string;
  album?: string;
  genre?: string;
  duration: number; 
}
  
const SongSchema = new Schema<SongDocumentInterface>({
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
    validate: (value: number) => {
      if (value <= 0) {
        throw new Error('Duration must be a positive number');
      }
    },
  },
});
  
export const Song = model<SongDocumentInterface>('Song', SongSchema);