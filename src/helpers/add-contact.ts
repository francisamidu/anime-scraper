import { getCustomFieldID, sendgridClient } from ".";

const addContact = async (
  name:string,
  email: string
) => {
  const confNum = Math.floor(Math.random() * 90000) + 10000;
  const customFieldID = await getCustomFieldID("conf_num");
  const data = {
    contacts: [
      {
        email: email,
        name,        
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
