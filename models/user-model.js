const { model, Schema, ObjectId } = require("Mongoose");

const userSchema = new Schema({
    _id: {
        type: ObjectId,
        required: true
    }
})