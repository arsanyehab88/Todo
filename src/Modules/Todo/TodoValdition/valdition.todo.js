import joi from "joi"

export const TodoSchema = joi.object({
    TodoName:joi.string(),
    description:joi.string(),
    createdBy:joi.string().hex(),
    status:joi.string()
})