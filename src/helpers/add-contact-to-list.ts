import { sendgridClient } from ".";
import { SENDGRID_MARKETING_URL } from "../shared/constants";

const addContactToList = async (email: string, listID: string) => {
  const data = {
    list_ids: [listID],
    contacts: [
      {
        email: email,
      },
    ],
  };
  return sendgridClient.request({
    url: SENDGRID_MARKETING_URL,
    body: data,
    method: "PUT",
  });
};
export default addContactToList;
