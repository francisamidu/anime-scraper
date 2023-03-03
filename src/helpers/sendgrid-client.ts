const sendgridClient = require("@sendgrid/client");
const sendgridMail = require("@sendgrid/mail");

sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);
export { sendgridClient, sendgridMail };
