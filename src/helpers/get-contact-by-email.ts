import { sendgridClient } from "./sendgrid-client";

const getContactByEmail = async (email: string) => {
  const data = {
    emails: [email],
  };
  const request = {
    url: `/v3/marketing/contacts/search/emails`,
    method: "POST",
    body: data,
  };
  const response = await sendgridClient.request(request);
  if (response[1].result[email]) return response[1].result[email].contact;
  else return null;
};
export default getContactByEmail;
