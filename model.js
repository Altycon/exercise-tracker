const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userExerciseSchema = Schema({
    _id: { type: Number, required: true },
    description: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String }
})

const userSchema = Schema({
    username: { type: String, required: true, index: true },
    _id: { type: Number, required: true},
    log: [userExerciseSchema]
});

module.exports = mongoose.model('User', userSchema);
