const express = require("express");
const path = require("path");
const mysql = require("mysql");
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
// don't forget to npm install the below
const expressHBS = require('express-handlebars')

dotenv.config({ path: './.env'})

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

var hbs = expressHBS.create({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layout"),
    partialsDir: path.join(__dirname, "views/partials")
});

app.engine("hbs", hbs.engine)
app.set("views", path.join(__dirname, "views"))

// changed to hbs, you had it as hps
app.set('view engine', 'hbs');

const publicDirectory = path.join(__dirname, './public');
app.use(express.static(publicDirectory));
//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies (as sent by API forms)
app.use(express.json());
app.use(cookieParser());

//Define Routes
app.use('/', require('./routes/pages.js')); 
app.use('/auth', require('./routes/auth'));

db.connect((error) => {
    if(error){
        console.log(error)
    }else{
        console.log("MySQL connected....")
    }
})

app.listen(5001, () =>{
    console.log("Server Started on port 5001!!")
})
