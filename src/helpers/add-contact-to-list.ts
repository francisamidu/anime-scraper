import { sendgridClient } from "./sendgrid-client";

const addContactToList = async (email: string, listID: string) => {
  const data = {
    list_ids: [listID],
    contacts: [
      {
        email: email,
      },
    ],
  };
  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };
  return sendgridClient.request(request);
};
export default addContactToList;
