import { Document } from 'mongoose';
interface SongDocumentInterface extends Document {
    title: string;
    artist: string;
    album?: string;
    genre?: string;
    duration: number;
}
export declare const Song: import("mongoose").Model<SongDocumentInterface, {}, {}, {}, Document<unknown, {}, SongDocumentInterface, {}> & SongDocumentInterface & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
