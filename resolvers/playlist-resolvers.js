const ObjectId = require("mongoose").Types.ObjectId;
const Playlist = require("../models/playlist-model");

module.exports = {
    Query: {
        /**
            @param {object} req - the request object containing a user id
            @return {array} - an array of playlist objects on success, and an empty array on failure 
        **/
        getAllPlaylists: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if (!_id) { return ([]) };
            const playlists = await Playlist.find({ user: _id });
            if (playlists) return playlists;
        },

        /**
            @param {object} args - a playlist id
            @returns {object} - a playlist on success and an empty object on failure 
        **/
       getPlaylistById: async(_, args) => {
           const { _id } = args;
           const objectId = new ObjectId(_id);
           const playlist = await Playlist.findOne({_id, objectId});
           if (playlist) return playlist;
           else return ({});
       },
    },
    Mutation: {
        /**
            @param {object} args - a playlist id and a song object 
            @returns {string} the objectId of the song or an error message
        **/

        addSong: async(_, args)  => {

        },
        /**
            @param {object} args - an empty playlist object
            @returns {string} the objectId of the playlist or an error message
        **/
        addPlaylist: async(_, args) => {
            const { playlist } = args;
            const objectId = new ObjectId();
            let { key, owner, name, picture, description, songs, followers, visibility, tags, duration } = playlist;
            const newPlaylist = new Playlist({
                _id: objectId,
                key: key,
                owner: owner,
                name: name,
                picture: picture,
                description: description,
                songs: songs,
                followers: followers,
                visibility: visibility,
                tags: tags,
                duration: duration
            })
            
            const updated = newPlaylist.save();
            if (updated) return objectId;
            else return ("Couldn't add playlist");
        },
        /**
            @param {object} args - an playlist object
            @returns {boolean} - successful delete: true, failure: false
        **/
       deletePlaylist: async (_, args) => {
           const { _id } = args;
           const objectId = new ObjectId(_id);
           const deleted = await Playlist.deleteOne({_id: obkectId});
           if (deleted) return true;
           else return false;
       }

    }
}