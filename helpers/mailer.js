const nodemailer = require('nodemailer')
require('dotenv').config()

const send = async(sendTo = "sample@gmail.com", title, content = "") => {
    let testAccount = await nodemailer.createTestAccount()

    
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    service: process.env.MAIL_SERVICE,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `"SLSU CAP" <${process.env.MAIL_USER}>`,
    to: sendTo, 
    subject: title, 
    html: content,
  });


  console.log("Message sent: %s", info.accepted);
}

module.exports = {
    send
}