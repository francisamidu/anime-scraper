const sendgridClient = require('@sendgrid/client');
sendgridClient.setApiKey(process.env.SENDGRID_API_KEY);
export default sendgridClient