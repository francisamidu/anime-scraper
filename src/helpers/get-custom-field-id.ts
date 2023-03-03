import sendgridClient from "./sendgrid-client";

const getCustomFieldID = async (customFieldName: string) => {
  const request = {
    url: `/v3/marketing/field_definitions`,
    method: "GET",
  };
  const response = await sendgridClient.request(request);
  const allCustomFields = response[1].custom_fields;
  return allCustomFields.find(
    (x: { name: string }) => x.name === customFieldName
  ).id;
};
export default getCustomFieldID;
