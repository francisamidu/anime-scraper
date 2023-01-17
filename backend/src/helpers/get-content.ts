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
      let scraped: AnimeLite[] = [];
      const site = sites.find((site) => site.includes(name)) || "";
      const content = dom.window.document.querySelector("#resultload");
      console.log(content);
      return [content];
    }
    case "gogoanime-trailers": {
    }
    case "gogoanime-upcoming": {
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
