// Initializing first variables and libraries
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection  = require("./database/database");
const questionModel = require("./database/Questions");
const answerModel = require("./database/Answers");


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
    questionModel.findAll({raw: true, order: [
        ['id', 'DESC'] // DESC = Descending, ASC = Ascending
    ]}).then(questions => {
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

// Creating a route to each question
app.get("/question/:id", (req, res) => {
    var id = req.params.id;
    questionModel.findOne({
        where: {id:id}  //Finding the question on the database by ID.
    }).then(question => {
        if (question != undefined) {
            answerModel.findAll({
                where: {questionId: question.id}
            }).then(answers => {
                res.render('question', {
                    question: question,
                    answers: answers   // exporting question to be used on that view.
                });
            });
            
        } else {
            res.redirect('/');    // If no question is found, then go back to the home page.
        }
    })
})

app.post("/answer", (req, res) => {
    var answerContent = req.body.answerContent;
    var questionId = req.body.questionId;
    answerModel.create({
        body: answerContent,
        questionId: questionId
    }).then(() => {
        res.redirect('/question/' + questionId);
    });
});

//Commanding server to listen on the defined port! Server online.
app.listen(8399, () => {console.log("App up and running!")});