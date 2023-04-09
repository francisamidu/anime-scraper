import { sendgridClient } from ".";

const deleteContactFromList = async (
  listID: string,
  contact: { id: string }
) => {
  await sendgridClient.request({
    url: `/v3/marketing/lists/${listID}/contacts`,
    method: "DELETE",
    qs: {
      contact_ids: contact.id,
    },
  });
};
export default deleteContactFromList;
