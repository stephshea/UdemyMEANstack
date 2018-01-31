var express = require("express");
var app =express();

// // app.set('port', 3000);
app.set('port', process.env.PORT);
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
    console.log('listening ' + port);
});
console.log('Me first');





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