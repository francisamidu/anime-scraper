import { JSDOM } from "jsdom";
import { sites } from "../shared";
const getGogoLinks = (dom: JSDOM) => {
  let linkDom = dom.window.document.querySelectorAll(".pagination li");
  const links = [...linkDom]
    .map((link) => {
      if (!link.classList.contains("selected")) {
        return link?.querySelector("a")?.getAttribute("href") || "";
      }
      return "";
    })
    .filter((el) => !!el);
  return links;
};
const getLinks = (dom: JSDOM, site: string): string[] => {
  let siteLink = sites.find((s) => s.title === site)?.link || "";
  switch (site) {
    case "animesuge.to": {
      let linkDom = dom.window.document.querySelectorAll(".anime_list a");
    }
    case "trailers": {
      return getGogoLinks(dom);
    }
    case "upcoming": {
      return getGogoLinks(dom);
    }
    case "requested-list": {
      return getGogoLinks(dom);
    }
    default: {
      let linkDom = dom.window.document.querySelectorAll(".anime_list a");
      let links = [...linkDom]
        .map((el) => `${siteLink}${el.getAttribute("href")}`)
        .filter((el) => !!el);
      return links;
    }
  }
};
export default getLinks;
