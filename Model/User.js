const { Schema, default: mongoose } = require("mongoose");

const userSchema = new Schema({
    userId : Number,
    userName : String,
    createdAt : Date
});

module.exports = mongoose.model("User", userSchema);