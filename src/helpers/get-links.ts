import { JSDOM } from "jsdom";
import { sites } from "../shared";
const getGogoLinks = (dom: JSDOM, site: string) => {
  let linkDom = dom.window.document.querySelectorAll(".pagination li");
  const links = [...linkDom]
    .map((link) => {
      if (!link.classList.contains("selected")) {
        return `${site}${link?.querySelector("a")?.getAttribute("href") || ""}`;
      }
      return "";
    })
    .filter((el) => !!el);
  return links;
};
const getLinks = (dom: JSDOM, site: string): string[] => {
  let siteLink = sites.find((s) => s.title === site)?.link || "";
  switch (site) {
    case "anihdplay": {
      let anihdLinkDom = dom.window.document.querySelectorAll(".pagination a");
      const anidhLinks = [...anihdLinkDom]
        .slice(1, -1)
        .map((el) => `${siteLink}${el.getAttribute("href")}`)
        .filter((el) => !!el);
      return anidhLinks;
    }
    case "animesuge.to": {
      let linkDom = dom.window.document.querySelectorAll(".anime_list a");
    }
    case "trailers": {
      return getGogoLinks(dom, siteLink);
    }
    case "upcoming": {
      return getGogoLinks(dom, siteLink);
    }
    case "requested-list": {
      return getGogoLinks(dom, siteLink);
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
