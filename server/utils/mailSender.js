const nodemailer = require("nodemailer");

const mailSender = async (email, title, body, attachmentPath) => {
    try {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587, // Common SMTP port; change if needed
            secure: false, // True for 465, false for other ports
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            },
        });

        let mailOptions = {
            from: 'IDC INDIA || info@chathub.net', // Sender address
            to: `${email}`, // Recipient email
            subject: `${title}`, // Email subject
            html: `${body}`, // Email body in HTML format
        };

        // Add attachment if `attachmentPath` is provided
        if (attachmentPath) {
            mailOptions.attachments = [
                {
                    filename: 'Payment_Receipt.pdf', // File name for the attachment
                    path: attachmentPath, // Path to the file
                },
            ];
        }

        // Send email
        let info = await transporter.sendMail(mailOptions);
        return info; // Return info for further usage or logging
    } catch (error) {
        console.log("Error sending email:", error.message);
        throw new Error("Email sending failed");
    }
};

module.exports = mailSender;
