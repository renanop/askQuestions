const express = require("express");
const app = express();


app.get('/', function (req, res) {
    res.send("Welcome to my website");
})

app.get("/store", function (req, res) {
    res.send("Welcome to the store!  Feel free to browse our products!")
})

app.get("/blog/:nome?", function (req, res) {
    var nome = req.params.nome;
    if (nome) {
        res.send("<h1>Welcome to the blog, " + nome + "!</h1>")
    } else {
        res.send("<h1>Welcome to the blog!</h1>")    
    }

})

app.get("/channel/youtube", function (req, res) {
    var channel = req.query["channel"];
    if (channel) {
        res.send("Olá! Bem vindo o canal: " + channel);
    }
    else {
        res.send("Nenhum canal informado!");
    }
})



app.listen(4000, function (error) {
    if (error) {
        console.log("An error has ocurred");
    }
    else {
        console.log("The server is up and running!!")
    }

})