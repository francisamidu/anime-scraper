const ck = require("ckey");
import nodemailer from "nodemailer";
import { google } from "googleapis";
import logger from "../middleware/rootLogger";
import { getErrorMessage } from ".";

const {
  GMAIL_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID,
  GMAIL_OAUTH_URL,
  GOOGLE_CLIENT_SECRET,
  FROM_EMAIL,
  TO_EMAIL,
} = ck;
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  let ACCESS_TOKEN = "";
  const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GMAIL_OAUTH_URL
  );

  oauth2Client.setCredentials({
    refresh_token: GMAIL_REFRESH_TOKEN,
  });

  oauth2Client.on("tokens", (tokens) => {
    if (tokens.refresh_token) {
      ACCESS_TOKEN = tokens.access_token || "";
    }
  });

  const transporter = nodemailer.createTransport({
    auth: {
      accessToken: ACCESS_TOKEN,
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      refreshToken: GMAIL_REFRESH_TOKEN,
      type: "OAuth2",
      user: FROM_EMAIL,
    },
    service: "gmail",
  });

  return transporter;
};

const sendEmail = async (text: string, subject: string) => {
  let emailTransporter = await createTransporter();
  try {
    await emailTransporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      text,
    });
  } catch (error) {
    const message = getErrorMessage(error);
    logger("error", {
      name: "error",
      message,
    });
  }
};

export default sendEmail;
