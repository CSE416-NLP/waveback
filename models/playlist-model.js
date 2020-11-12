const { model, Schema, ObjectId } = require("mongoose");
const Song = require('./song-model').schema;

const playlistSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        key: {
            type: Number,
            required: true
        },
        owner: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        picture: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        songs: [Song],
        songURIs: [String],
        followers: {
            type: Number,
            reqiured: true
        }, 
        visibility: {
            type: String,
            required: true
        },
        tags: [String],
        duration: {
            type: Number,
            required: true
        },
    },

    { timestamps: true }
);

const Playlist = model("Playlist", playlistSchema);
module.exports = Playlist;