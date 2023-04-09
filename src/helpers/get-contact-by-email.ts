import { sendgridClient } from "./sendgrid-client";
import { SENDGRID_CONTACT_EMAIL } from "../shared/constants";

const getContactByEmail = async (email: string) => {
  const data = {
    emails: [email],
  };
  const response = await sendgridClient.request({
    url: SENDGRID_CONTACT_EMAIL,
    method: "POST",
    body: data,
  });
  if (response[1].result[email]) return response[1].result[email].contact;
  else return null;
};
export default getContactByEmail;
