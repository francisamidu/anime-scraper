const ck = require("ckey");
import nodemailer from "nodemailer";
import { google } from "googleapis";
import logger from "../middleware/rootLogger";

const {
  GMAIL_ACCESS_TOKEN,
  GMAIL_REFRESH_TOKEN,
  GOOGLE_CLIENT_ID,
  GMAIL_OAUTH_URL,
  GOOGLE_CLIENT_SECRET,
  FROM_EMAIL,
  FROM_PASSWORD,
  TO_EMAIL,
} = ck;
const OAuth2 = google.auth.OAuth2;

const createTransporter = async () => {
  const oauth2Client = new OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GMAIL_OAUTH_URL
  );

  oauth2Client.setCredentials({
    refresh_token: GMAIL_REFRESH_TOKEN,
  });

  const accessToken = await new Promise((resolve, reject) => {
    oauth2Client.getAccessToken((err, token) => {
      if (err) {
        reject("Failed to create access token :(");
      }
      resolve(token);
    });
  });

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.EMAIL,
      accessToken,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
    },
  });

  return transporter;
};

const sendEmail = async (emailOptions) => {
  let emailTransporter = await createTransporter();
  await emailTransporter.sendMail(emailOptions);
};
