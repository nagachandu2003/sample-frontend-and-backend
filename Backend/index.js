const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : 'root123',
    database : 'world'
})

app.get("/users",(req,res) => {
    const query = 'SELECT * FROM login_users';
    let arr = []
    db.query(query, (err,data) => {
        if(err){
            console.log(err);
            return res.json("Error Occurred");
        } else {
            for(let values of data)
            arr.push(values);
            return res.json(data); // Send JSON response
        }
    });
});

app.post("/users",(req,res) => {
    const {body} = req
    const {userinput,password} = body
    console.log("From Backend");
    const que = `INSERT INTO login_users (username,password) values('${userinput}','${password}');`;
    db.query(que,(err,data) => {
        if(err){
            res.json("Error Occurred")
        }
        res.status(200).send("User inserted successfully");
    })
});

app.put("/users",(req,res) => {
    const {body} = req
    const {userinput,password} = body
    console.log(body);
    console.log("From Backend");
    const que = `UPDATE table login_users set password=${password} where username=${userinput}`;
    db.query(que,(err,data) => {
        if(err){
            res.json("Error Occurred")
        }
        res.status(200).send("Password Updated successfully");
    })
});



// app.post("/users",(req,res) => {
//     const {body} = req
//     console.log(req.body)
//     const {username,password} = body
//     const que = `INSERT INTO login_users (username,password) values('${username}','${password}');`;
//     db.query(que,(err,data) => {
//         if(err){
//             return res.json("Error Occurred")
//         }
//         return res.status(200).send("User inserted successfully");
//     })
// })


app.delete("/users/:username", (req, res) => {
    const { username } = req.params;
    console.log(username)
    const que = `DELETE FROM login_users WHERE username = '${username}'`;
    db.query(que, (err, data) => {
        if (err) {
            console.log(err);
            return res.status(500).send("Error deleting user");
        }
        return res.status(200).send("User deleted successfully");
    });
});


app.listen(8085, () => {
    console.log("Listening");
    console.log("Your server is running at http://localhost:8085")
});