import { JSDOM } from "jsdom";
const getLinks = (dom: JSDOM, site: string) => {
  let linkDom = dom.window.document.querySelectorAll(".anime_list a");
  let links = [...linkDom]
    .map((el) => `${site}${el.getAttribute("href")}`)
    .filter((el) => !!el);
  return links;
};
export default getLinks;
