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
      host : '127.0.0.1',
      user : 'postgres',
      password : 'letmein',
      database : 'smart-brains'
    }
  });

app.post('/signin', handleSignIn(db, bcrypt));

app.post('/register' , handleRegister(db, bcrypt , salt));


app.put('/image' ,handleImage(db));
app.post('/getImage' ,(req, res) => {handleApiCall(req, res)});

app.listen(process.env.PORT || 3000 , () => {
    console.log(`Listening at port ${process.env.PORT}`)
});
