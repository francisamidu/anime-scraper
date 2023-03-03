import { sendgridClient } from ".";

const deleteContactFromList = async (
  listID: string,
  contact: { id: string }
) => {
  const request = {
    url: `/v3/marketing/lists/${listID}/contacts`,
    method: "DELETE",
    qs: {
      contact_ids: contact.id,
    },
  };
  await sendgridClient.request(request);
};
export default deleteContactFromList;
