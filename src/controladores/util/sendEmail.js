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

function sendEmail(email) {

    const htmlWelcome = require('./welcome')

    const mailOptions = {
        from: '"The Rookies Web Site" <leme.30589@gmail.com>',
        to: email,
        subject: 'Welcome to The Rookies',
        html: htmlWelcome
    };

    transporter.sendMail(mailOptions, (error, sucess) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.status(200);
        }
    });
}

module.exports = sendEmail;
