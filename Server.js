import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcrypt";
import handleRegister from "./Controllers/Register.js";
import handleSignIn from "./Controllers/SignIn.js";
import handleImage from "./Controllers/Image.js";
import {handleApiCall} from "./Controllers/Image.js";


const app = express();
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());

const salt = bcrypt.genSaltSync(10);

const db = knex({
    client: 'pg',
    connection: {
      connectionString : 'postgres://uxrwsprfyrryjc:357e45b4baf8fb2d45cd8d046cbc8f5c9ae53e89df4794fd5f5b2670dcc96cad@ec2-52-70-15-120.compute-1.amazonaws.com:5432/d8dh35128ndfah',
      ssl : true
    }
  });

app.get('/' , (req,res) => {res.send('It is working!')});

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register' , handleRegister(db, bcrypt , salt));


app.put('/image' ,handleImage(db));
app.post('/getImage' ,(req, res) => {handleApiCall(req, res)});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Listening at port ${process.env.PORT}`)
});
