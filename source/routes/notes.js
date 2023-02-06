const express = require('express');
const router = express.Router();


const Note = require('../models/Note'); // We require the model of the data we will store

//Route for add a new task, basically where the form is 
router.get('/notes/add', (req, res) => {
    res.render('notes/new-note'); // Render the new-note.hbs 
})


//In the post process, we need to add events that could happen when you're trying to add a new note
router.post('/notes/new-note', async (req, res) => {
    const {title, description} = req.body; // the body of the request has names defined in the hbs, as title in the input box and description name defined in the texarea box
    const errors = []; // if we have errors, store them in an array

    if(!title){
        errors.push({text: "Please write a tittle"});
    }
    if(!description){
        errors.push({text: "Please write a description"});
    }
    if(errors.length > 0){
        res.render('notes/new-note', {
            errors,
            title,
            description
        });
    }
    else {
      const newNote = new Note({ title, description });
      await newNote.save();
      res.redirect('/notes')
    }

})

router.get('/notes', async (req, res) => {
    const notes = await Note.find().lean();
    console.log(notes);
    res.render('notes/all-notes', { notes });
})

module.exports = router;