// Dependencies
const fs = require("fs");
const path = require("path");
// added UUID
const { v4: uuidv4 } = require("uuid");

const notes = require("../db/db.json");

// Note creation
function createNote(body, notesArray) {
    const notes = body;
    if (!Array.isArray(notesArray))
        // empty array
        notesArray = [];

    if (notesArray.length === 0) notesArray.push(0);

    body.id = notesArray[0] + uuidv4();
    notesArray[0]++;

    notesArray.push(notes);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesArray, null, 2)
    );
    return notes;
}

// Note deletion
function deleteNote(id, notesArray) {
    //find the UUID of the note
    const index = notesArray.indexOf(notesArray.find(el => el.id === id));
    //delete the note from the array
    if (index > -1) {
        notesArray.splice(index, 1);
        // write new array
        fs.writeFileSync(
            path.join(__dirname, '../db/db.json'),
            JSON.stringify(notesArray, null, 2)
        );
    }
    // return notes array
    return notesArray;

}



// router
module.exports = function (router) {
    //get
    router.get("/api/notes", (req, res) => {
        res.json(notes.slice(1));
    });

    //req
    router.post("/api/notes", (req, res) => {
        const newNote = createNote(req.body, notes);
        res.json(newNote);
    });

    //delete req
    router.delete("/api/notes/:id", (req, res) => {
        deleteNote(req.params.id, notes);
        res.json(true);
    });
}