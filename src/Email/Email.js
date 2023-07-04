import nodemailer from "nodemailer"

export const  sendEmail=(email,sub,html)=>{
    let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "arsanyehab558@gmail.com", // generated ethereal user
            pass: "ccoytnafxruonbvu"
        }
    })
    
    let info = transporter.sendMail({
        from: '"Fred Foo 👻" <arsanyehab558@gmail.com>',
        to: email,
        subject: sub,
        text: "Hello world?",
        html:html,
    });
}