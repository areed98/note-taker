// Dependencies
const path = require("path");

// router creation
module.exports = function (router) {
    // routes
    router.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    router.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    // bad match
    router.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
};