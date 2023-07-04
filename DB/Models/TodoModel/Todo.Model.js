import mongoose from 'mongoose';






const TodoSchema = new mongoose.Schema({
    TodoName:String,
    description:String,
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    status:{
        type:String,
        enum:["pending","completed"],
        default:"pending"
    }
},{
    timestamps:true
});

const TodoModel = mongoose.model("todo",TodoSchema);
export default TodoModel;