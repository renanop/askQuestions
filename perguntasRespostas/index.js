// Initializing first variables and libraries
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection  = require("./database/database");
const questionModel = require("./database/Questions");


connection
    .authenticate()
    .then(() => {
        console.log("Connection with the database has been made.")
    })
    .catch((errorMessage) => {
        console.log(errorMessage);
    });

// Telling express that i wanna use EJS as my View Engine. 
app.set('view engine', 'ejs');
//Telling express to look for CSS and JS files inside de "public" directory
app.use(express.static("public"));

// Bodyparser: Convert received data to javascript 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Creating routes! -> model.findAll is used for receiving the data from the DB. Then (promiss) in order to send it to the front end.
app.get("/", (req, res) => {
    questionModel.findAll({raw: true}).then(questions => {
        res.render("home",{
            questions: questions
        });
    });
});
//Using the get method to define the ask page. 
app.get("/ask", (req, res) => {
    res.render("ask")
});

// capturing data from the form with the POST http method
app.post("/savequestion", (req, res) => {
    var title = req.body.title;
    var description = req.body.description;
    questionModel.create({
        title: title,
        description: description,
    }).then(() => {
        res.redirect('/');
    });
});

//Commanding server to listen on the defined port! Server online.
app.listen(8399, () => {console.log("App up and running!")});