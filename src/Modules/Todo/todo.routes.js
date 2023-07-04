import express from "express"
import { Create, DeleteTodo, DeleteTodoAll, GetData, MakeAll, Search, UpdateTodo } from "./todo.controller.js"
import { auth } from "../../MiddleWare/auth.js"
import { Valdiation } from "../../MiddleWare/valdition.js"
import { TodoSchema } from "./TodoValdition/valdition.todo.js"


const RouterTodo = express.Router()


RouterTodo.post("/create",auth,Valdiation(TodoSchema),Create)

RouterTodo.get("/GetTodo",auth,GetData)

RouterTodo.put("/UpdateTodo/:_id",auth,UpdateTodo)

RouterTodo.delete("/DeleteTodo/:_id",auth,DeleteTodo)

RouterTodo.delete("/DeleteAll",auth,DeleteTodoAll)

RouterTodo.post("/search",auth,Search)

RouterTodo.put("/MakeALl",auth,MakeAll)





export default RouterTodo;