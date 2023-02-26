import sites from "../shared/sites";
import { JSDOM } from "jsdom";
import logger from "../middleware/rootLogger";
import { getContent, getHTML, getLinks } from ".";

const queryHTML = async () => {
  try {
    let scraped: any[] = [];
    logger("info", {
      message: "Initiating scraper",
      name: "Info",
      information: "Anime-Scraper",
    });

    for (let site of sites) {
      let html = await getHTML(site.link);
      let dom = new JSDOM(html);
      let links = getLinks(dom, site.title);
      for (let link of links) {
        let file = await getHTML(link);
        let dom = new JSDOM(file);
        let content = getContent(dom, link);
        scraped = [scraped, content].flat(Infinity);
        logger("info", {
          message: `Scraped ${link}`,
          name: "Info",
          information: site.title,
        });
      }
    }
    return scraped;
  } catch (error) {
    throw error;
  }
};
export default queryHTML;
