import * as dotenv from 'dotenv'
dotenv.config()
import { connection } from "./DB/connection.js";
import express from "express";
import router from './src/Modules/User/user.routes.js';
import RouterTodo from './src/Modules/Todo/todo.routes.js';
import cors from 'cors';
import PhotoRouter from './src/Modules/Photos/Photos.routes.js';




const app = express();


app.use(express.json());

connection()
app.use(cors());

app.use("/user",router)
app.use("/Todo",RouterTodo)
app.use("/Photos",PhotoRouter)


app.use(express.static("todolist/build"))
app.get("*",(req,res)=>{
    res.sendFile(`C:/Users/arsan/AppData/Local/Programs/assignment/Todolist/todolist/build/index.html`)
})


app.listen(3001, () => {
    console.log("connected");
});
