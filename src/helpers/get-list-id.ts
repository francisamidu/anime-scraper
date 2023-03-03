import { sendgridClient } from "./sendgrid-client";

const getListID = async (listName: string) => {
  const request = {
    url: `/v3/marketing/lists`,
    method: "GET",
  };
  const response = await sendgridClient.request(request);
  const allLists = response[1].result;
  return allLists.find((x: { name: string }) => x.name === listName).id;
};
export default getListID;
