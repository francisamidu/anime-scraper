import { JSDOM } from "jsdom";
import sites from "../shared/sites";
import { removeDuplicates, removeUndefined } from ".";
import { AnimeLite } from "../types";

export default (dom: JSDOM, name: string) => {
  switch (name) {
    case "animesuge": {
      let scraped: AnimeLite[] = [];
      const site = sites.find((site) => site.includes(name)) || "";
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
      // metro booming - heroes and villains
      // Khalid - satellite mp3
      // Odumublack - picanto mp3
      // Young filly - day to day mp3
      // Savage - confident mp3
      // master kg ft nkosizana daughter -
      let scraped: AnimeLite[] = [];
      const site = sites.find((site) => site.includes(name)) || "";
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
      const site = sites.find((site) => site.includes(name)) || "";
      const mainBody = dom.window.document.querySelector(".main_body");
      const itemsList = mainBody?.querySelector(".items-request");
      const liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        const image = li.querySelector("img")?.getAttribute("src");
        const title = li.querySelector("a")?.getAttribute("title");
        const link = li.querySelector("a")?.getAttribute("href");
        scraped = [
          ...scraped,
          {
            link: `${site}${link}`,
            image: `${image}`,
            title: `${title}`,
          },
        ];
      });
      return scraped;
    }
    case "trailers": {
      let scraped: AnimeLite[] = [];
      const site = sites.find((site) => site.includes(name)) || "";
      const mainBody = dom.window.document.querySelector(".main_body");
      const itemsList = mainBody?.querySelector(".items-news");
      const liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        const image = li.querySelector("img")?.getAttribute("src");
        const el = li.querySelector(".title")?.firstElementChild;
        const title = el?.getAttribute("title");
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
      return scraped;
    }
    case "upcoming": {
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
      return animes;
    }
  }
};
