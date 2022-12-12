import nodemailer from "nodemailer";
import logger from "../middleware/rootLogger";

export default (content: string) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "francisamidu124@gmail.com",
      pass: "starboy124",
    },
  });

  const mailOptions = {
    from: "francisamidu124@gmail.com",
    to: "famidu3@gmail.com",
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
