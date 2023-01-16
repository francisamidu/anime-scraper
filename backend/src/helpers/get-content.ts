import { JSDOM } from "jsdom";
import sites from "../shared/sites";
import { removeDuplicates, removeUndefined } from ".";

export default (dom: JSDOM, name: string) => {
  switch (name) {
    case "animesuge": {
      const site = sites.find((site) => site.includes(name)) || "";
      const ulContent = dom.window.document.querySelectorAll(".content li");
      const content = [...ulContent];
      const elements = content.map((element: Element) => {
        const links = [...element.querySelectorAll(".poster")];
        return links.map((link) => {
          const info = link.querySelector(".info");
          const href = link?.getAttribute("href");
          const image =
            link.querySelector(".lazyload")?.getAttribute("data-src") || "";
          const title = info?.querySelector("a")?.textContent || "";
          return {
            link: `${site}${href}`,
            image,
            title,
          };
        });
      });
      return removeUndefined(elements.flat(1));
    }
    case "animixplay": {
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
