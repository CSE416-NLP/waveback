const { model, Schema, ObjectId } = require("mongoose");

const userSchema = new Schema(
    {
        _id: {
            type: ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            required: true
        },
        profilePicture: {
            type: String,
            required: false
        },
        playlists: {
            type: [ObjectId],
            required: true
        },
        following: {
            type: [ObjectId],
            required: true
        },
        bio: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        favoriteGenres: {
            type: [String],
            required: false
        },
        favoriteArtists: {
            type: [String],
            required: false
        },
        favoriteSongs: {
            type: [String],
            required: false
        },
        defaultVisibility: {
            type: String,
            required: true
        },
        theme: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const User = model("User", userSchema);
module.exports = User;