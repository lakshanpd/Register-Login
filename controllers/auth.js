const mysql = require("mysql2");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
})

exports.register = function(req, res){
    console.log(req.body);

    // const name = req.body.name;
    // const email = req.body.email;
    // const password = req.body.password;
    // const confirm_password = req.body.confirm_password;

    const {name, email, password, confirm_password} = req.body;


    db.query('SELECT email FROM user where email = ?', [email], async function(error, result){
        if (error){
            console.log(error);
        }

        if (result.length > 0){
            return res.render('register', {
                message: 'That email is already in use'
            })
        }
        else if (password !== confirm_password){
            return res.render('register', {
                message: 'Password do not match'
            });
        }

        let hashedPassword = await bcrypt.hash(password, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO user SET ?', {name: name, email: email, password: hashedPassword}, function(error, result){
            if (error){
                console.log(error)
            }
            else{
                console.log(result)
                return res.render('register', {
                    message: 'User registered'
                })
            }
        })
   
    });

}