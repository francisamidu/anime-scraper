require("dotenv").config();
import { Client } from "@sendgrid/client";
import { MailService } from "@sendgrid/mail";
const ckey = require("ckey");
const sendgridClient = new Client();
const sendgridMail = new MailService();

const { SENDGRID_API_KEY } = ckey;

sendgridMail.setApiKey(SENDGRID_API_KEY);
sendgridClient.setApiKey(SENDGRID_API_KEY);
export { sendgridClient, sendgridMail };
