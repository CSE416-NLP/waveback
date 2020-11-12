const ObjectId = require("mongoose").Types.ObjectId;
const bcrypt = require('bcryptjs');
const User = require("../models/user-model");
const tokens = require("../utils/tokens");

module.exports = {
    Query: {
        /**
            @param {object} req - the requested user id
            @returns {object} success: user object, failure: empty object
        **/
        getCurrentUser: async (_, __, { req }) => {
            const _id = new ObjectId(req.userId);
            if (!_id) {
                return ({});
            }
            const found = await User.findOne(_id);
            if (found) {
                return found;
            }
        },
    },
    Mutation: {
        /**
            @param {object} args - login info
            @param {object} res - response object containing current access/refresh tokens
            @returns {object} success: user object, failure: error message
        **/
        login: async (_, args, { res }) => {
            const { username, password } = args;
            if (!username || !password)         // Check that both username and password were sent
                return ({ username: "Must provide both username and password." })

            const user = await User.findOne({ username: username });
            if (!user)                          // Check that an account with the sent username exists
                return ({ username: "Account with that username not found." });

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {                       // Check that the password sent matches the stored hashed password
                return ({ username: "Password does not match." });
            }

            const accessToken = tokens.generateAccessToken(user);
            const refreshToken = tokens.generateRefreshToken(user);
            // res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });
            // res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'None', secure: true })
            res.cookie('refresh-token', refreshToken, { httpOnly: true});
            res.cookie('access-token', accessToken, { httpOnly: true})
            return user;
        },
        /**
            @param {object} args - registration info
            @param {object} res - response object containing current access/refresh tokens
            @returns {object} success: user object, failure: error message
        **/
        register: async (_, args, { res }) => {
            const { username, email, password } = args;
            if (!username || !email || !password)
                return ({ username: "Must provide a username, email, and password" })
            
            const username_exists = await User.findOne({ username: username });
            if (username_exists) {
                return ({ username: "Account with this username already exists. Please choose a new username." });
            }
            
            const email_exists = await User.findOne({ email: email });
            if (email_exists) {
                return ({ username: "Account with this email already exists. Please enter a new email." });
            }

            const hashed_password = await bcrypt.hash(password, 10);
            const _id = new ObjectId();
            const user = new User({
                _id: _id,
                username: username,
                email: email,
                password: hashed_password,
                admin: false,
                playlists: [],
                following: [],
                bio: "",
                location: "",
                favoriteGenres: [],
                favoriteArtists: [],
                favoriteSongs: [],
                defaultVisibility: "public",
                theme: "Modern",
                profilePicture: "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?b=1&k=6&m=1223671392&s=612x612&w=0&h=5VMcL3a_1Ni5rRHX0LkaA25lD_0vkhFsb1iVm1HKVSQ=",
            })
            const saved = await user.save();

            const accessToken = tokens.generateAccessToken(user);
            const refreshToken = tokens.generateRefreshToken(user);
            // res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true });
            // res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'None', secure: true });
            res.cookie('refresh-token', refreshToken, { httpOnly: true});
            res.cookie('access-token', accessToken, { httpOnly: true});
            return user;
        },

        /**
          @params {object} res  - response obje
        **/
        logout: (_, __, { res }) => {
            res.clearCookie("refresh-token");
            res.clearCookie("access-token");
            return true;
        },

        updateUserProfile: async (_, args) => {
            let { _id, bio, location, favoriteGenres, favoriteArtists, favoriteSongs, profilePicture } = args;
            const objectId = new ObjectId(_id);
            const saved = await User.updateOne({ _id: objectId }, {
                bio: bio, location: location, favoriteGenres: favoriteGenres,
                favoriteArtists: favoriteArtists, favoriteSongs: favoriteSongs,
                profilePicture: profilePicture,
            })
            if (saved) return true;
            else return false;
        },

        updateUserAccount: async (_, args) => {
            let { _id, username, email, password } = args;
            const objectId = new ObjectId(_id);
            let saved = false;
            if (password) {
                const newPassword = await bcrypt.hash(password, 10);
                saved = await User.updateOne({ _id: objectId }, { username: username, email: email, password: newPassword });
            }
            else {
                saved = await User.updateOne({ _id: objectId }, { username: username, email: email });
            }
            if (saved) return true;
            else return false;
        }
    }
}