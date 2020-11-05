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
            const user = await User.findOne({ username: username });

            if (!user) {
                return ({ msg: "User with that email not found." });
            }

            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                return ({ msg: "Invalid Password." });
            }

            const accessToken = tokens.generateAccessToken(user);
            const refreshToken = tokens.generateRefreshToken(user);
            res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true});
            res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'None', secure: true })
            return user;
        },
        /**
            @param {object} args - registration info
            @param {object} res - response object containing current access/refresh tokens
            @returns {object} success: user object, failure: error message
        **/
        register: async (_, args, { res }) => {
            const { username, email, password } = args;
            const email_exists = await User.findOne({ email: email });
            if (email_exists) {
                return ({ msg: "User with this email already exists. Please enter a new email." });
            }
            const username_exists = await User.findOne({ username: username });
            if (username_exists) {
                return ({ msg: "User with this username already exists. Please choose a new username." });
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
                theme: "Modern"
            })
            const saved = await user.save();

            const accessToken = tokens.generateAccessToken(user);
            const refreshToken = tokens.generateRefreshToken(user);
            res.cookie('refresh-token', refreshToken, { httpOnly: true, sameSite: 'None', secure: true});
            res.cookie('access-token', accessToken, { httpOnly: true, sameSite: 'None', secure: true})

            return user;
        },

        /**
          @params {object} res  - response obje
        **/
        logout: (_, __, { res }) => {
            res.clearCookie("refresh-token");
            res.clearCookie("access-token");
            return true;
        }

    }
}