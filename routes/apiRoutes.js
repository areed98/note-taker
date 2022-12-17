// Dependencies
const fs = require("fs");
const path = require("path");

const notes = require("../db/db.json");

// Note creation
function createNote(body, notesArray) {
    const notes = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

    if (notesArray.length === 0) notesArray.push(0);

    body.id = notesArray[0]
    notesArray[0]++;

    notesArray.push(notes);
    fs.writeFileSync(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(notesArray, null, 2)
    );
    return notes;
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
}