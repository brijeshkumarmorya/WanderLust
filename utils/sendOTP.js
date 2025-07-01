const nodemailer = require("nodemailer");
require("dotenv").config();

const sendOTP = async (email, otp) => {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    let mailOptions = {
        from: `WanderLust <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your OTP Code",
        text: `Your OTP code is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;
