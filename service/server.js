var express = require('express');

var passport  = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');



if(cookieParser == undefined){

}

var app = express();


app.use(session({
    secret: 'HGDSGHD34534fsdfsEERGDTHF',
    resave: true,
    saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//require ("./test/app.js")(app);
var mongooseAPI = require("./model/server")(app);

require("./app.js")(app, mongooseAPI, passport);

var port = process.env.PORT || 3000;
app.listen(port);