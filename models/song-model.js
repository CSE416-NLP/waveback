const { model, Schema, ObjectId } = require("mongoose");

const songSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        songURI: {
            type: String,
            required: true
        },
        key: {
            type: Number,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        artist: {
            type: String,
            required: true
        },
        album: {
            type: String,
            required: false
        },
        albumPicture: {
            type: String,
            required: false
        },
        genre: [String],
        year: {
            type: Number,
            required: false
        },
        duration: {
            type: Number,
            required: true
        }
    }
);

const Song = model("Song", songSchema);
module.exports = Song;