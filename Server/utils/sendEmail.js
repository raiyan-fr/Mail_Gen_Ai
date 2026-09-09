const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error(
        "Email and password must be set in environment variables",
      );
    }
    // Create a transporter using SMTP
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: options.to,
      subject: options.subject,
      text: options.text,
      html: `<p>${options.text}</p>`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`Email sent successfully`);
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw error;
  }
};

module.exports = sendEmail;
