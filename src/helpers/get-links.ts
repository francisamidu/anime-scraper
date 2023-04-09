import { JSDOM } from "jsdom";
import { sites } from "../shared";
const getGogoLinks = (dom: JSDOM, site: string) => {
  let linkDom = dom.window.document.querySelectorAll(".pagination li");
  const links = [...linkDom]
    .map(
      (link) => `${site}${link?.querySelector("a")?.getAttribute("href") || ""}`
    )
    .filter((el) => !!el);
  return links;
};
const getLinks = (dom: JSDOM, site: string): string[] => {
  let siteLink = sites.find((s) => s.title === site)?.link || "";
  switch (site) {
    case "anihdplay": {
      let anihdLinkDom = dom.window.document.querySelectorAll(".pagination a");
      const anidhLinks = [...anihdLinkDom]
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
    case "release": {
      let linkDom = dom.window.document.querySelectorAll(".pagination-list a");
      let links = [...linkDom]
        .map((el) => `${siteLink}${el.getAttribute("href")}`)
        .filter((el) => !!el);
      return links;
    }
    case "reviews": {
      let linkDom = dom.window.document.querySelectorAll(".pagination-list a");
      let links = [...linkDom]
        .map((el) => `${siteLink}${el.getAttribute("href")}`)
        .filter((el) => !!el);
      return links;
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
