import mongoose, { Schema, model } from 'mongoose';

export interface Rushing extends mongoose.Document {
    player: string;
    team: string;
    pos: string;
    attg: number;
    att: number;
    yds: string;
    avg: number;
    ydsg: number;
    td: number;
    lng: number;
    first: number;
    firstpercentage: number;
    twenty: number;
    forty: number;
    fum: number
};

const RushingSchema = new Schema({
    player: String,
    team: String,
    pos: String,
    attg: Number,
    att: Number,
    yds: Number,
    avg: Number,
    ydsg: Number,
    td: Number,
    lng: String,
    first: Number,
    firstpercentage: Number,
    twenty: Number,
    forty: Number,
    fum: Number
});

export default model<Rushing>('Rushing', RushingSchema);