import { sendgridClient } from ".";
import { SENDGRID_FIELDS_URL } from "../shared/constants";

const getCustomFieldID = async (customFieldName: string) => {
  const response = await sendgridClient.request({
    url: SENDGRID_FIELDS_URL,
    method: "GET",
  });
  const allCustomFields = response[1].custom_fields;
  return allCustomFields.find(
    (x: { name: string }) => x.name === customFieldName
  ).id;
};
export default getCustomFieldID;
