//require dependencies
const express = require ( "express");
const fs = require('fs');
const path = require ('path');

//initialise express app
const app = express ();
const PORT = process.env.PORT || 1000;

//setup data parsing
app.use (express.urlencoded({ extended: true}));
app.use (express.json());
app.use (express.static(__dirname));

//require routes file 
require('./route')(app);

//setup listener
app.listen(PORT, function () {
    console.log("app listening on port: " + PORT);
    
});