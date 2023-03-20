const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../helpers/auth");

const Note = require("../models/Note"); // We require the model of the data we will store

//Route for add a new task, basically where the form is
router.get("/notes/add", isAuthenticated, (req, res) => {
  res.render("notes/new-note"); // Render the new-note.hbs
});

//In the post process, we need to add events that could happen when you're trying to add a new note
router.post("/notes/new-note", isAuthenticated, async (req, res) => {
  const { title, description } = req.body; // the body of the request has names defined in the hbs, as title in the input box and description name defined in the texarea box
  const errors = []; // if we have errors, store them in an array

  // if there aren't a title written in the form, add a document in the array with the text saying please.... and push it on the array errors
  if (!title) {
    errors.push({ text: "Please write a tittle" });
  }

  // the same process if you don't write anything in the description form
  if (!description) {
    errors.push({ text: "Please write a description" });
  }

  // And if there are errors, render with the alerts (rendered in new-note.hbs )
  if (errors.length > 0) {
    res.render("notes/new-note", {
      errors,
      title,
      description,
    });
  }
  // Else just store the notes form document, creating a new note with the model class created and sotre in a constant
  else {
    const newNote = new Note({ title, description });
    newNote.user = req.user.id;
    await newNote.save(); // save the note
    req.flash("success_msg", "Note added successfully");
    res.redirect("/notes");
  }
});

//get all the notes in the route /notes and then store the different notes in a constant variable called notes sorted and ordered by the date descrecing
router.get("/notes", isAuthenticated, async (req, res) => {
  const notes = await Note.find({user: req.user.id}).lean().sort({ date: "desc" });
  console.log(notes);
  res.render("notes/all-notes", { notes });
});

router.get("/notes/edit/:id", isAuthenticated, async (req, res) => {
  const note = await Note.findById(req.params.id);
  res.render("notes/edit-note", { note });
});

router.put("/notes/edit-note/:id", isAuthenticated, async (req, res) => {
  const { title, description } = req.body;
  await Note.findByIdAndUpdate(req.params.id, { title, description });
  req.flash("success_msg", "Note updated successfully");
  res.redirect("/notes");
});

router.delete("/notes/delete/:id", isAuthenticated, async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Note deleted successfully");
  res.redirect("/notes");
});

module.exports = router;
