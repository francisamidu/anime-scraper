import sites from "../shared/sites";
import { JSDOM } from "jsdom";
import logger from "../middleware/rootLogger";
import { getContent, getHTML, getLinks, removeDuplicates } from ".";

const queryHTML = async () => {
  try {
    let scraped: any[] = [];
    let links: any[] = [];
    logger("info", {
      message: "Initiating scraper",
      name: "Info",
      information: "Anime-Scraper",
    });
    //   await Promise.all(players.map(async (player) => {
    // await givePrizeToPlayer(player);
    //     }));
    await Promise.all(
      sites.map(async (site) => {
        let html = await getHTML(site.link);
        let dom = new JSDOM(html);
        links = [...links, getLinks(dom, site.title)].flat(Infinity);
        links = Array.from(new Set(links));
      })
    ).finally(async () => {
      for (let link of links) {
        let file = await getHTML(link);
        let dom = new JSDOM(file);
        let content = getContent(dom, link);
        scraped = [scraped, content].flat(Infinity);
        scraped = removeDuplicates(scraped);
      }
      console.log(scraped);
    });
    return scraped;
  } catch (error) {
    throw error;
  }
};
export default queryHTML;
