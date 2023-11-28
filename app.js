const express = require("express");
const mysql = require("mysql2");
const dotenv = require('dotenv');
const path = require('path');

const app = express();

dotenv.config({path: './.env'});

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

const publicDirectory = path.join(__dirname, './public')
app.use(express.static(publicDirectory))

//parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: false}))
//parse JSON bodies (as sent by API clients)
app.use(express.json())

app.set('view engine', 'hbs')

db.connect(function(error){
    if (error){
        console.log(error)
    }
    else{
        console.log("MYSQL Connected...")
    }
})

//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));
app.use('/log', require('./routes/log'));

app.listen(5000, function(){
    console.log("Server started on port 5000")
})