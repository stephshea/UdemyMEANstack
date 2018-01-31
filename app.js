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