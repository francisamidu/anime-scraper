import { JSDOM } from "jsdom";
import sites from "../shared/sites";
import removeDuplicates from "./removeDuplicates";

export default (dom: JSDOM) => {
  let pageContent = dom.window.document.querySelectorAll(
    ".page_content .news-items a"
  );

  const content = removeDuplicates([...pageContent]);
  const animeNames = content.map((el) => {
    let image = el?.querySelector(".lazy")?.getAttribute("data-original");
    return {
      title: el?.getAttribute("title"),
      link: `${sites[0]}${el.getAttribute("href")}`,
      image,
    };
  });
  return animeNames;
};
