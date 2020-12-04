const ObjectId = require("mongoose").Types.ObjectId;
const Playlist = require("../models/playlist-model");

module.exports = {
    Query: {

        /**
            @return {array} - array of public playlists
        **/
        getAllPublicPlaylists: async (_, __) => {
            // const _id = new ObjectId(req.userId);
            const playlists = await Playlist.find({ visibility: "public", });
            // const playlists = await Playlist.find({ owner: "q", });
            if (playlists) return playlists;
        }
    },

    Mutation: {
        /**
            @param {object} args - a playlist id and a song object 
            @returns {string} the objectId of the song or an error message
        **/

        addSong: async (_, args) => {

        },
        /**
            @param {object} args - an empty playlist object
            @returns {string} the objectId of the playlist or an error message
        **/
        addPlaylist: async (_, args) => {
            const { playlist } = args;
            const objectId = new ObjectId();
            let { key, owner, name, picture, description, songs, songURIs, followers, visibility, tags, duration } = playlist;
            const newPlaylist = new Playlist({
                _id: objectId,
                key: key,
                owner: owner,
                name: name,
                picture: picture,
                description: description,
                songs: songs,
                songURIs: songURIs,
                followers: followers,
                visibility: visibility,
                tags: tags,
                duration: duration
            })

            const saved = await newPlaylist.save();
            if (saved) return objectId;
            else return ("Couldn't add playlist");
        },

        // deleteAllPlaylists: async (_, args) => {
        //     const { duration } = args;
        //     const deleted = await Playlist.deleteMany({});
        //     console.log(deleted);
        //     if (deleted) return true;
        //     else return false;
        // },
        deleteAllPlaylists: async () => {
            const deleted = await Playlist.deleteMany({});
            console.log(deleted);
            if (deleted) return true;
            else return false;
        },
        /**
            @param {object} args - an playlist object
            @returns {boolean} - successful delete: true, failure: false
        **/
        deletePlaylist: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const deleted = await Playlist.deleteOne({ _id: objectId });
            if (deleted) return true;
            else return false;
        },
        /**
            @param {object} args - a playlist objectID, an array of songs, and a name
            @returns {boolean} successful update: true, failure: false
         **/
        updatePlaylist: async (_, args) => {
            let { _id, name, picture, description, songs, songURIs, tags, duration } = args;
            const objectId = new ObjectId(_id);

            // for (let i = 0; i < songs.length; i++) {
            //     if (!songs[i]._id){
            //         songs[i]._id = new ObjectId();
            //     }
            // }
            const saved = await Playlist.updateOne({ _id: objectId }, {
                name: name, picture: picture,
                description: description, songs: songs,
                songURIs: songURIs, tags: tags,
                duration: duration
            })
            if (saved) return true;
            else return false;
        },

        /**
             @param {object} req - the request object containing a user id
             @return {array} - an array of playlist objects on success, and an empty array on failure 
        **/
      
        getUserPlaylists: async (_, args, { res }) => {
            const { owner } = args;
            if (!owner) { return ([]) };
            const playlists = await Playlist.find({ owner: owner });
            // console.log(playlists);
            if (playlists) return playlists;
        },
        /**
            @param {object} args - a playlist id
            @returns {object} - a playlist on success and an empty object on failure 
        **/
        getPlaylist: async (_, args) => {
            const { _id } = args;
            const objectId = new ObjectId(_id);
            const playlist = await Playlist.findOne({ _id, objectId });
            if (playlist) return playlist;
            else return ({});
        }
    }
}