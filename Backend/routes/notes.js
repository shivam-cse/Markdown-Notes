const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const Notes = require('../models/Notes');
const fetchUser = require('../middleware/fetchUser')

//Route 1 : get all the notes using : GET "/api/notes/fetchallnotes" - Login required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
   try {
        //fetch all the notes of loggined user
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes)

    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "internal server error-" });
    }

})
//Route 2 : add  the notes using : POST "/api/notes/addnote" - Login required
router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 characters ').isLength({ min: 5 }),
], async (req, res) => {

    try {
        //validate the user data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        //getting data
        const { title, description, tag } = req.body;

        //add new notes
        const addNote = new Notes({ title, description, tag, user: req.user.id })
        const saveNotes = await addNote.save();
        res.json(saveNotes)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ error: "internal server error" });
    }
})

//Route 3 : Update existing note : PUT  "/api/notes/updatenote" - Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;
    // create new notes objects
    const newNote = {};

    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }


    try {
        //find the note 
        let note = await Notes.findById(req.params.id);
        if (!note) {
            //this notes id does not exist
            return res.status(404).send("Not found");
        }

        //match the user who loggined in our platform
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not found");

        }
        //update the notes
        const updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json(updatedNote)
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "internal server error" });
    }

})

//Route 4 : delete an existing note : DELETE  "/api/notes/deletenote" - Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {

        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not found");
        }

        //allow deletion only actual user there
        if (note.user.toString() !== req.user.id) {
            return res.status(404).send("Not found");

        }

        const updatedNote = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "message": "Note id have been deleted", note: note });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error: "internal server error-" });
    }

})

module.exports = router;