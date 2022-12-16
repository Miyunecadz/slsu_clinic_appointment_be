const mailer = require('./helpers/mailer')

async function send() {
   await mailer.send("jvcadz.dev@gmail.com", "Sample", "Hello NodeMailer")
}

send()