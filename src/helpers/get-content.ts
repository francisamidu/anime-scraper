import { JSDOM } from "jsdom";
import sites from "../shared/sites";
import { removeDuplicates, removeUndefined } from ".";
import { AnimeLite } from "../types";

export default (dom: JSDOM, name: string) => {
  switch (name) {
    case "anihdplay": {
      let scraped: AnimeLite[] = [];
      let content = [
        ...dom.window.document.querySelectorAll(".main-content .items li"),
      ];
      content.forEach((item) => {
        const link = item.querySelector("a")?.getAttribute("href") || "";
        const image =
          item.querySelector("img")?.getAttribute("data-savepage-src") || "";
        const title = item.querySelector(".name")?.textContent?.trim() || "";
        scraped.push({
          link,
          image,
          title,
        });
      });
      return removeDuplicates(scraped);
    }
    case "animesuge": {
      let scraped: AnimeLite[] = [];
      const site = sites.find((site) => site.link.includes(name))?.link || "";
      const content = [...dom.window.document.querySelectorAll(".content")];
      content.forEach((c) => {
        const els = c.querySelectorAll("li");
        const elements = [...els]
          .map((element: Element) => {
            const info = element.querySelector(".info");
            const href =
              element.firstElementChild?.getAttribute("href") ||
              element.querySelector(".poster")?.getAttribute("href");
            const image: any =
              element.querySelector(".lazyload")?.getAttribute("data-src") ||
              element.querySelector("img")?.getAttribute("src");
            const title = info?.querySelector("a")?.textContent || "";
            return {
              link: `${site}${href}`,
              image,
              title,
            };
          })
          .flat(1);
        scraped = [...scraped, ...elements];
      });
      return removeDuplicates(scraped);
    }
    case "animixplay": {
      let scraped: AnimeLite[] = [];
      const site = sites.find((site) => site.link.includes(name))?.link || "";
      const content = dom.window.document.querySelector("#resultload");
      const liElements = content?.querySelectorAll("li");
      liElements?.forEach((li) => {
        const link = li.firstElementChild?.getAttribute("href");
        const text = li.querySelector(".name")?.textContent;
        const image = li.querySelector("img")?.getAttribute("src");
        scraped = [
          ...scraped,
          {
            link: `${site}${link}`,
            image: String(image),
            title: String(text).trim(),
          },
        ];
      });
      return scraped;
    }
    case "requested-list": {
      let scraped: AnimeLite[] = [];
      let site = sites.find((site) => site.link.includes(name))?.link || "";
      site = site.replace("/requested-list", "");
      const mainBody = dom.window.document.querySelector(".main_body");
      const itemsList = mainBody?.querySelector(".items-request");
      const liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        let title = li.querySelector("a")?.getAttribute("title");
        title =
          title ||
          li?.querySelector("a")?.textContent?.replace(/["']/g, "").trim();
        const link = li.querySelector("a")?.getAttribute("href");
        scraped = [
          ...scraped,
          {
            link: `${site}${link}`,
            image: `${image}`,
            title: `${title || li?.querySelector("a")?.textContent}`,
          },
        ];
      });
      return removeDuplicates(scraped);
    }
    case "trailers": {
      let scraped: AnimeLite[] = [];
      let site = sites.find((site) => site.link.includes(name))?.link || "";
      const mainBody = dom.window.document.querySelector(".main_body");
      const itemsList = mainBody?.querySelector(".items-news");
      const liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        const el = li.querySelector(".title")?.firstElementChild;
        let title = el?.getAttribute("title");
        title = title || el?.textContent?.replace(/["']/g, "").trim();
        let link = el?.getAttribute("href") || "";
        link.replace("/trailers", "");
        console.log(site);
        console.log(link);
        scraped = [
          ...scraped,
          {
            link: `${site}${link}`,
            image: `${image}`,
            title: `${title}`,
          },
        ];
      });
      return removeDuplicates(scraped);
    }
    case "upcoming": {
      let scraped: AnimeLite[] = [];
      let site = sites.find((site) => site.link.includes(name))?.link || "";
      site = site.replace("/upcoming-anime/tv-series", "");
      const mainBody = dom.window.document.querySelector(".main_body");
      const itemsList = mainBody?.querySelector(".items");
      const liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        const el = li.querySelector(".name")?.firstElementChild;
        let title = el?.getAttribute("title");
        title = title || el?.textContent?.replace(/["']/g, "").trim();
        const link = el?.getAttribute("href");
        scraped = [
          ...scraped,
          {
            link: `${site}${link}`,
            image: `${image}`,
            title: `${title}`,
          },
        ];
      });
      return removeDuplicates(scraped);
    }
    default: {
      let pageContent = dom.window.document.querySelectorAll(
        ".page_content .news-items a"
      );

      const content = removeDuplicates([...pageContent]);
      const animeNames = content.map((el) => {
        let image: string = el
          ?.querySelector(".lazy")
          ?.getAttribute("data-original");
        return {
          title: el?.getAttribute("title"),
          link: `${sites[0]}${el.getAttribute("href")}`,
          image,
        };
      });
      const animes = animeNames.filter((anime) => anime.title);
      return removeDuplicates(animes);
    }
  }
};
