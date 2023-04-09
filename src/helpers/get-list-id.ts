import { SENDGRID_LISTS_URL } from "../shared/constants";
import { sendgridClient } from "./sendgrid-client";

const getListID = async (listName: string) => {
  const response = await sendgridClient.request({
    url: SENDGRID_LISTS_URL,
    method: "GET",
  });
  const allLists = response[1].result;
  return allLists.find((x: { name: string }) => x.name === listName).id;
};
export default getListID;
