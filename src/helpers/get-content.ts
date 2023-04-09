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
        let link = item.querySelector("a")?.getAttribute("href") || "";
        let image =
          item.querySelector("img")?.getAttribute("data-savepage-src") || "";
        let title = item.querySelector(".name")?.textContent?.trim() || "";
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
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      let content = [...dom.window.document.querySelectorAll(".content")];
      content.forEach((c) => {
        let els = c.querySelectorAll("li");
        let elements = [...els]
          .map((element: Element) => {
            let info = element.querySelector(".info");
            let href =
              element.firstElementChild?.getAttribute("href") ||
              element.querySelector(".poster")?.getAttribute("href");
            let image: any =
              element.querySelector(".lazyload")?.getAttribute("data-src") ||
              element.querySelector("img")?.getAttribute("src");
            let title = info?.querySelector("a")?.textContent || "";
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
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      let content = dom.window.document.querySelector("#resultload");
      let liElements = content?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let link = li.firstElementChild?.getAttribute("href");
        let text = li.querySelector(".name")?.textContent;
        let image = li.querySelector("img")?.getAttribute("src");
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
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      site = site.replace("/requested-list", "");
      let mainBody = dom.window.document.querySelector(".main_body");
      let itemsList = mainBody?.querySelector(".items-request");
      let liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        let title = li.querySelector("a")?.getAttribute("title");
        title =
          title ||
          li?.querySelector("a")?.textContent?.replace(/["']/g, "").trim();
        let link = li.querySelector("a")?.getAttribute("href");
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
    case "release": {
      let scraped: AnimeLite[] = [];
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      site = site.replace("/releases", "");
      console.log(site);
      let itemsList = dom.window.document.querySelector(".items");
      let liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        let link = li.querySelector(".name a");
        const title = link?.getAttribute("title");
        scraped = [
          ...scraped,
          {
            link: `${site}${link?.getAttribute("href")}`,
            image: `${image}`,
            title: `${title}`,
          },
        ];
      });
      return removeDuplicates(scraped);
    }
    case "reviews": {
      let scraped: AnimeLite[] = [];
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      site = site.replace("/reviews", "");
      let itemsList = dom.window.document.querySelector(".items-news");
      let liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        let link = li.querySelector(".title a");
        const title = link?.getAttribute("title");
        scraped = [
          ...scraped,
          {
            link: `${site}${link?.getAttribute("href")}`,
            image: `${image}`,
            title: `${title}`,
          },
        ];
      });
      console.log(scraped);
      return removeDuplicates(scraped);
    }
    case "trailers": {
      let scraped: AnimeLite[] = [];
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      let mainBody = dom.window.document.querySelector(".main_body");
      let itemsList = mainBody?.querySelector(".items-news");
      let liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        let el = li.querySelector(".title")?.firstElementChild;
        let title = el?.getAttribute("title");
        title = title || el?.textContent?.replace(/["']/g, "").trim();
        let link = el?.getAttribute("href") || "";
        link.replace("/trailers", "");
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
      let site = sites.find((site) => site.title.includes(name))?.link || "";
      site = site.replace("/upcoming-anime/tv-series", "");
      let mainBody = dom.window.document.querySelector(".main_body");
      let itemsList = mainBody?.querySelector(".items");
      let liElements = itemsList?.querySelectorAll("li");
      liElements?.forEach((li) => {
        let image = li.querySelector("img")?.getAttribute("src");
        if (!image?.includes("cdn")) {
          image = li.querySelector("img")?.getAttribute("data-original");
        }
        let el = li.querySelector(".name")?.firstElementChild;
        let title = el?.getAttribute("title");
        title = title || el?.textContent?.replace(/["']/g, "").trim();
        let link = el?.getAttribute("href");
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

      let content = removeDuplicates([...pageContent]);
      let animeNames = content.map((el) => {
        let image: string = el
          ?.querySelector(".lazy")
          ?.getAttribute("data-original");
        return {
          title: el?.getAttribute("title"),
          link: `${sites[0]}${el.getAttribute("href")}`,
          image,
        };
      });
      let animes = animeNames.filter((anime) => anime.title);
      return removeDuplicates(animes);
    }
  }
};
