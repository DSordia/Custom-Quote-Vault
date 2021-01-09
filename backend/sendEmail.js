import nodemailer from 'nodemailer'
import config from './config.js'

const sendResetLink = (email, id) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: config.email,
                pass: config.emailPass }
    })

    let mailOptions = {
        from: 'customquotevault@gmail.com',
        to: email,
        subject: 'Reset Password for Custom Quote Vault',
        text: `To reset your Custom Quote Vault password, click the following link: http://localhost:3000/reset/${id}`
    }

    transporter.sendMail(mailOptions, err => { if (err) console.log(err) })
}

export default sendResetLink