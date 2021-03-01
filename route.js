const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require('uuid');
let notes;

 function updateDB() {
    fs.writeFile("./db/db.json", JSON.stringify(notes, "\t"), (err) => {
      if (err) throw err;
      return true;
    });
  }

module.exports = (app) => {
  //setup notes variable
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;

    notes = JSON.parse(data);



    //updates the json file whenever a note is added or deleted
  });

      // API ROUTES

    //setup the api/notes get route
    app.get("/api/notes", function (req, res) {
      //return all saved notes as JSON.
      res.json(notes);
    });

    //setup the api/notes post route
    app.post("/api/notes", function (req, res) {
      //receive notes/data, adds into the db.json, then return the new note

      let newNote = req.body;
      newNote.id = uuidv4();
      notes.push(newNote);
      updateDB();
      return console.log("added new note: " + newNote.title);
    });
    //retrieve a note with specific id
    app.get("/api/notes/:id", function (req, res) {
      res.json(notes[req.params.id]);
      
    });
    //deletes a note with specific id
    app.delete("/api/notes/:id", function (req, res) {
      notes.splice(req.params.id, 1);
      updateDB();
      console.log("Deleted note with id " + req.params.id);
      res.end();
    });

    //view routes

    //display notes.html when/notes is accessed
    app.get("/notes", function (req, res) {
      res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
    // Display index.html when all other routes are accessed
    app.get("*", function (req, res) {
      res.sendFile(path.join(__dirname, "./public/index.html"));
    });
};

