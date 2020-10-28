const { model, Schema, ObjectId } = require("mongoose");

const playlistSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    }
});

const Playlist = model("Playlist", playlistSchema);
module.exports = Playlist;