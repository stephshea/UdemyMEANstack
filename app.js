var express = require("express");
var app =express();
var path = require('path');

// app.set('port', 3000);
app.set('port', process.env.PORT);

app.use(express.static(path.join(__dirname, 'public' )));
//will look for index.html of file name omitted

// app.get('/', function(request, response) {
//     console.log("Get the homepage");
//     response.status(200).sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.use('/public', express.static(path.join(__dirname, 'public' )));

app.get('/json', function(request, response) {
    console.log("Get the json");
    response.status(200).json( {"jsonData" : true});
});

app.get('/file', function(request, response) {
    console.log("Get the file");
    response.status(200).sendFile(path.join(__dirname, 'app.js'));
});

var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('listening ' + port);
});
// console.log('Me first');





//can use npm start to run as well as node app.js
require('./instantHello');
//best not to use file extensions
//this required file runs immediately

var goodbye = require('./talk/goodbye');
var talk = require('./talk');
//specifying folder makes app look for file
var question = require('./talk/question');

talk.intro();
talk.hello("Abby");
//method calls

var answer = question.ask("What is the meaning of life?");
console.log(answer);

goodbye();