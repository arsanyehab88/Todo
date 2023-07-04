import TodoModel from "../../../DB/Models/TodoModel/Todo.Model.js";






export const Create = async (req, res) => {
    try {
        const { TodoName, description } = req.body;
        let todo = await TodoModel.insertMany({ TodoName, description, createdBy: req.userId })
        res.json({ massage: "Done", todo })
    } catch (err) {
        res.json({ massage: "err", err })
    }

}

export const GetData = async (req, res) => {

    try {
        let todo = await TodoModel.find({ createdBy: req.userId }).populate("createdBy")
        if (todo) {
            res.json({ massage: "Done", todo })
        } else {
            res.json({ massage: "Not Found" })
        }

    } catch (err) {
        console.log(err);
        res.json({ massage: "err", err })
    }
}

export const UpdateTodo = async (req, res) => {
    try {
        const {_id}=req.params;
        let exist = await TodoModel.findOne({ _id })
        if (exist) {
            if (exist.createdBy == req.userId) {
                if(exist.status=="completed")return res.json({massage:"Already Completed"})
                let todo = await TodoModel.updateOne({ _id }, { status:"completed" })
                res.json({ massage: "Done", todo })
            } else {
                res.json({ massage: "User Not Create Todo" })
            }
        } else {
            res.json({ massage: "Id Not Found" })
        }
    } catch (err) {
        console.log(err);
        res.json({ massage: "err", err })
    }

}

export const DeleteTodo = async (req, res) => {
    try {
        const { _id } = req.params;
        let exist = await TodoModel.findOne({ _id })
        if (exist) {
            if (exist.createdBy == req.userId) {
                let todo = await TodoModel.deleteOne({ _id })
                res.json({ massage: "Done", todo })
            } else {
                res.json({ massage: "User Not Create Todo" })
            }
        } else {
            res.json({ massage: "Id Not Found" })
        }
    } catch (err) {
        console.log(err);
        res.json({ massage: "err", err })
    }

}


export const DeleteTodoAll = async (req, res) => {
    try {
        let todo = await TodoModel.find({ createdBy: req.userId })
        if (todo.length != 0) {
            todo.map(async (ele) => {
                let deleted = await TodoModel.deleteMany({ _id: ele._id })

            })
            res.json({ massage: "Done" })
        } else {
            res.json({ massage: "Not Found" })
        }
    } catch (err) {

        res.json({ massage: "err", err })
    }
}


export const Search = async (req, res) => {
    const { Search } = req.body
    let todo = await TodoModel.find({ TodoName: Search, createdBy: req.userId })
    if (todo.length != 0) {
        res.json({ massage: "Done", todo })
    } else {
        res.json({ massage: "Not Found" })
    }
}

export const MakeAll = async (req, res) => {
    const todo = await TodoModel.find({ createdBy: req.userId })

    if (todo.length != 0) {
        todo.map(async (ele) => {
            const updates = await TodoModel.updateMany({ _id: ele._id }, { status: "completed" })
        })
        res.json({ massage: "Done" })
    } else {
        res.json({ massage: "Not Found" })
    }
}