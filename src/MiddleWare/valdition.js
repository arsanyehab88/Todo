



export const Valdiation = (schema) => {

    return (req, res, next) => {

        let { error } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            res.json({ massage: "Error", error })
        } else {
            next()
        }
    }

}