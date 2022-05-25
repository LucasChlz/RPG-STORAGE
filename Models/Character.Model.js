const mongoose = require('../database');

const CharacterSchema = mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    scenario: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },

    lore: {
        type: String,
        required: true
    },

    owner: {
        type: String,
        required: true
    }
});

const Character = mongoose.model('Character', CharacterSchema);

module.exports = Character;