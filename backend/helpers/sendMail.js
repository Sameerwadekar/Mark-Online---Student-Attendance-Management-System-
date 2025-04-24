const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "snehalsameer2005@gmail.com",
    pass: "osjaufxeafrusghy",
  },
});

async function sendMail(to, subject, text, html) {
  try {
    const info = await transporter.sendMail({
      from: '"Mark_Online" <snehalsameer2005@gmail.com>',
      to,
      subject,
      text,
      html, // <-- Use the function parameter here
    });
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendMail;
