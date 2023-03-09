import { getCustomFieldID, sendgridClient } from ".";
import { SENDGRID_MARKETING_URL } from "../shared/constants";

const addContact = async (firstName: string, email: string) => {
  const confNum = Math.floor(Math.random() * 90000) + 10000;
  const customFieldID = await getCustomFieldID("conf_num");
  const data = {
    contacts: [
      {
        email: email,
        first_name: firstName,
        custom_fields: {} as any,
      },
    ],
  };
  data.contacts[0].custom_fields[customFieldID] = confNum;
  return sendgridClient.request({
    url: SENDGRID_MARKETING_URL,
    method: "PUT",
    body: data,
  });
};
export default addContact;
