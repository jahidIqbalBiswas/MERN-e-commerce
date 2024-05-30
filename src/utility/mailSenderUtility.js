const nodemailer = require("nodemailer")
const sendMail = async (mailto,mailsub,mailtext) => {
   const transporter =  nodemailer.createTransport({
        host:"mail.entahost.com",
        port: 465,
        secure:true,
        auth:{
            user:"mail@entahost.com",
            pass:"XMzCLHI~P8t9"
        },
        tls:{
            rejectUnauthorized:false
        }
    })
    const mailOptions = {
        from:"MERN e-commerce solution. <mail@mern.com>",
        to:mailto,
        subject:mailsub,
        text:mailtext
    }
  return await transporter.sendMail(mailOptions)
}
module.exports = sendMail;