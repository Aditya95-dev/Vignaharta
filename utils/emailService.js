const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
        
        // Use App Password if using Gmail
    },
    debug: true // Show detailed logs

});

const sendEmail = async ({ to, subject, html }) => {
    const mailOptions = {
        from: `"Insurance Reminder" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html
    };
    

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent to ${to}:`, info.response);
        return info;
    } catch (error) {
        console.error(`❌ Failed to send email to ${to}:`, error.message);
        throw error;
    }
};

module.exports = sendEmail;