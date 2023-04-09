import sites from "../shared/sites";
import { JSDOM } from "jsdom";
import logger from "../middleware/rootLogger";
import {
  getContent,
  getFile,
  getHTML,
  getLinks,
  removeDuplicates,
  writeToFile,
} from ".";

const queryHTML = async () => {
  try {
    let scraped: any[] = [];
    let links: any[] = [];
    logger("info", {
      message: "Initiating scraper",
      name: "Info",
      information: "Anime-Scraper",
    });
    const file = await getFile(sites[3].file);
    const dom = new JSDOM(file);
    const tempLinks = getLinks(dom, sites[3].title);
    console.log(tempLinks);
    let tempContent: any[] = [];
    await Promise.all(
      tempLinks.map(async (link) => {
        const siteLink =
          sites.find((site) => site.link.includes(link))?.title || "";
        let file = await getHTML(link);
        let dom = new JSDOM(file);
        let content = getContent(dom, siteLink);
        tempContent = [...tempContent, content].flat(Infinity);
        tempContent = removeDuplicates(tempContent);
      })
    );
    console.log(tempContent);
    // await Promise.all(
    //   sites.map(async (site) => {
    //     let html = await getHTML(site.link);
    //     let dom = new JSDOM(html);
    //     links = [...links, getLinks(dom, site.title)].flat(Infinity);
    //     links = Array.from(new Set(links));
    //   })
    // ).finally(async () => {
    //   for (let link of links) {
    //     const siteLink =
    //       sites.find((site) => site.link.includes(link))?.title || "";
    //     let file = await getHTML(link);
    //     let dom = new JSDOM(file);
    //     let content = getContent(dom, siteLink);
    //     scraped = [scraped, content].flat(Infinity);
    //     scraped = removeDuplicates(scraped);
    //   }
    // });
    return scraped;
  } catch (error) {
    throw error;
  }
};
export default queryHTML;
