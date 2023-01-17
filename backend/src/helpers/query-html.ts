import sites from "../shared/sites";
import { JSDOM } from "jsdom";
import logger from "../middleware/rootLogger";
import { getContent, getFile, getHTML, getLinks } from ".";

const queryHTML = async () => {
  try {
    let scraped: any[] = [];
    logger("info", {
      message: "Initiating scraper",
      name: "Info",
      information: "Anime-Scraper",
    });
    // for (let site of sites) {
    //   let html = await getHTML(site);
    //   let dom = new JSDOM(html);
    //   let links = getLinks(dom, site);
    //   switch (site) {
    //     case "https://appnee.com/category/wallpaper/": {
    //       return links;
    //     }
    //     default: {
    //       for (let link of links) {
    //         let file = await getHTML(link);
    //         let dom = new JSDOM(file);
    //         let content = getContent(dom, link);
    //         scraped = [scraped, content].flat(Infinity);
    //         logger("info", {
    //           message: `Scraped ${link}`,
    //           name: "Info",
    //           information: site,
    //         });
    //       }
    //     }
    //   }
    // }
    const file = await getFile("gogoanime-requested.html");
    let dom = new JSDOM(file);
    const content = getContent(dom, "gogoanime-requested");
    return content;
  } catch (error) {
    throw error;
  }
};
export default queryHTML;
