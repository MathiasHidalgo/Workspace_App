// In models folder we add the models fo the database data

const mongoose = require('mongoose')
const { Schema } = mongoose; // Use schema's functionality

//defining how the model of the data should be
const NoteSchema = new Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, default: Date.now }
})

module.exports = mongoose.model('Note', NoteSchema)
