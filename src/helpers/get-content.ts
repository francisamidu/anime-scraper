import { JSDOM } from "jsdom";
import sites from "../shared/sites";
import removeDuplicates from "./remove-duplicates";

export default (dom: JSDOM, link: string) => {
  if (link.includes("honeysanime")) {
    let pageContent = dom.window.document.querySelectorAll(
      ".news-box .content .news-items"
    );
    const content = [...pageContent];
    return content.map((el) => {
      const link = el?.querySelector("a");
      const image = link?.querySelector("img")?.getAttribute("data-src");
      const anime = {
        image,
        link: link?.getAttribute("href"),
        title: link?.getAttribute("title"),
      };
      return anime;
    });
  }
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
};
