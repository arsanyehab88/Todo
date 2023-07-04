import jwt from "jsonwebtoken"




export const auth = (req, res, next) => {
    let authorization = req.headers["authorization"]
    if (!authorization || (authorization && authorization.startsWith("Bearer") == false)) {
        res.json({ massage: "Invalid Token" })
        
    } else {
        let token = authorization.split(" ")[1]
        jwt.verify(token, process.env.KEY, (err, decoded) => {
            if (err) {
                res.json({ massage: "Invalid Token" })
            } else {
                req.Email = decoded.Email
                req.userId = decoded.userId
                next()
            }
        })
    }


}