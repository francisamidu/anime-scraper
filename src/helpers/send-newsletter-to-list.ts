import { sendgridClient, sendgridMail } from ".";
import { SENDGRID_CONTACT_SEARCH_URL } from "../shared/constants";
const ckey = require("ckey");
const sendNewsletterToList = async (
  subject: string,
  htmlNewsletter: string,
  listID: string
) => {
  const data = {
    query: `CONTAINS(list_ids, '${listID}')`,
  };

  const response = await sendgridClient.request({
    url: SENDGRID_CONTACT_SEARCH_URL,
    method: "POST",
    body: data,
  });
  for (const subscriber of response[1].result) {
    const unsubscribeURL = `https://anime-scraper/delete?email=${subscriber.email}`;
    const msg = {
      to: subscriber.email, // Change to your recipient
      from: ckey.TO_EMAIL, // Change to your verified sender
      subject: subject,
      html:
        htmlNewsletter + `<a href="${unsubscribeURL}"> Unsubscribe here</a>`,
    };
    sendgridMail.send(msg);
  }
};
export default sendNewsletterToList;
