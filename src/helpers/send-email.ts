import nodemailer from "nodemailer";
import logger from "../middleware/rootLogger";

export default (content: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.FROM_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL,
    to: process.env.TO_EMAIL,
    subject: "Anime updates",
    text: content,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      logger("error", error);
    } else {
      logger("info", {
        message: "Email sent: " + info.response,
        name: "Email confirmation",
        information: info.response,
      });
    }
  });
};
