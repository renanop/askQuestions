let http = require("http");

http.createServer(function(request, response) {
    response.end("<h1> Welcome to my first web application!<h1>");
}).listen(3000);


console.log("My server is running!");