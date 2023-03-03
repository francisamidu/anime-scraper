import { getCustomFieldID, sendgridClient } from ".";

const addContact = async (
  firstName: string,
  lastName: string,
  email: string
) => {
  const confNum = Math.floor(Math.random() * 90000) + 10000;
  const customFieldID = await getCustomFieldID("conf_num");
  const data = {
    contacts: [
      {
        email: email,
        first_name: firstName,
        last_name: lastName,
        custom_fields: {} as any,
      },
    ],
  };
  data.contacts[0].custom_fields[customFieldID] = confNum;
  const request = {
    url: `/v3/marketing/contacts`,
    method: "PUT",
    body: data,
  };
  return sendgridClient.request(request);
};
export default addContact;
