const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.login = function(req, res){

    const {name, password} = req.body;

    console.log(req.body);
    
    db.query('SELECT * FROM user where name = ?', [name], async function(error, result){
        if (error){
            console.log(error)
        }
        else{
            console.log(result)
            const isMatch = await bcrypt.compare(password, result[0].password);
            
            if (isMatch){
                res.send('<h1> Successfully logged in')
            }

            else{
                res.render('login', {
                    message: 'Login failed'
                })
            }               
        }
    })
}