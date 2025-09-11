const nodemailer = require('nodemailer');
require('dotenv').config();

const sendOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS, // Use App Password here
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your OTP for Login',
        text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOTP;



// const nodemailer = require('nodemailer');
// const twilio = require('twilio');
// require('dotenv').config();

// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Use App Password here
//   },
// });

// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// // Send OTP via Email
// const sendEmailOTP = async (email, otp) => {
//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: email,
//     subject: 'Your OTP for Login',
//     text: `Your OTP is: ${otp}. It will expire in 5 minutes.`,
//   };

//   await transporter.sendMail(mailOptions);
//   console.log('OTP sent via Email');
// };

// // Send OTP via Phone
// const sendPhoneOTP = async (phone, otp) => {
//   await twilioClient.messages.create({
//     body: `Your OTP code is: ${otp}. It will expire in 5 minutes.`,
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to: phone,
//   });
//   console.log('OTP sent via Phone');
// };

// // Unified OTP Sending Function
// const sendOTP = async (contact, otp, method = 'email') => {
//   try {
//     if (method === 'phone') {
//       await sendPhoneOTP(contact, otp);
//     } else {
//       await sendEmailOTP(contact, otp);
//     }
//   } catch (error) {
//     console.error(`Error sending OTP via ${method}:`, error);
//     throw error;
//   }
// };

// module.exports = sendOTP;

