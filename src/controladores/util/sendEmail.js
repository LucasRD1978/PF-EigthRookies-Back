const nodemailer = require('nodemailer');
const { USER_EMAIL, USER_PASS } = process.env;


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: USER_EMAIL,
        pass: USER_PASS
    }
});

function sendEmailWelcome(email) {

    const htmlWelcome = require('./welcome')

    const mailOptions = {
        from: '"The Rookies Web Site" <leme.30589@gmail.com>',
        to: email,
        subject: 'Welcome to The Rookies',
        html: htmlWelcome
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error.message);
        }
    });
}

function sendEmailPurchase(email, payment_id) {

    const htmlPurchase = require('./purchase');

    const mailOptions = {
        from: '"The Rookies Web Site" <leme.30589@gmail.com>',
        to: email,
        subject: `Your purchase number is ${payment_id}`,
        html: htmlPurchase
    };

    transporter.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error.message);
        }
    });
}

module.exports = { sendEmailWelcome, sendEmailPurchase };
