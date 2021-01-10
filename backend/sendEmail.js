import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config()

const sendResetLink = (email, id) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user: process.env.EMAIL,
                pass: process.env.EMAIL_PASS }
    })

    let mailOptions = {
        from: `${process.env.EMAIL}`,
        to: email,
        subject: 'Reset Password for Custom Quote Vault',
        text: `To reset your Custom Quote Vault password, click the following link: https://custom-quote-vault.herokuapp.com/reset/${id}`
        //text: `To reset your Custom Quote Vault password, click the following link: http://localhost:3000/reset/${id}`
    }

    transporter.sendMail(mailOptions, err => { if (err) console.log(err) })
}

export default sendResetLink