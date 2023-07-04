import mongoose from "mongoose";

export const connection = () => {
    mongoose.set("strictQuery", true)
    mongoose.connect(process.env.CONNECTIONURL).then(() => {
        console.log("connected tO Mongo");
    }).catch((err) => {
        console.log("Error", err);
    })
}