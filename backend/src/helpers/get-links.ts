import { JSDOM } from "jsdom";
const getLinks = (dom: JSDOM, site: string): string[] => {
  switch (site) {
    case "https://appnee.com/category/wallpaper/": {
      let linkDom = dom.window.document.querySelectorAll(".entry-title a");
      const temp = [...linkDom];
      const appnee = [
        "Bing",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
        "No Watermark",
      ].map((el) => el.toLowerCase());
      let appneeLink = temp
        .filter((el) => el?.textContent?.toLowerCase()?.includes("bing"))
        .map((el) => `${el?.getAttribute("href")}`);
      return appneeLink;
    }
    case "https://honeysanime.com/display/around-the-hive/": {
      const filters = ["First", "Prev.", "Next"];
      let linkDom = dom.window.document.querySelectorAll(".ha-pagination li a");
      let honeysLinks = [...linkDom]
        .filter((el) => !filters.includes(String(el?.textContent)))
        .map((el) => `${site}${el.getAttribute("href")}`)
        .filter((el) => !!el);
      const lastEl = honeysLinks.at(-1)?.split("/").at(-2);
      const range = [
        site,
        ...Array(Number(lastEl))
          .fill(1)
          .map((_, i) => i)
          .splice(2, Array(Number(lastEl)).length - 2),
      ].map((el) => (typeof el === "number" ? `${site}page/${el}` : el));
      return range;
    }
    case "https://animesuge.to": {
      let linkDom = dom.window.document.querySelectorAll(".anime_list a");
    }
    case "https://gogoanime.news/requested-list.html": {
    }
    case "https://gogoanime.news/upcoming-anime/tv-series": {
    }
    case "https://gogoanime.news/requested-list.html": {
    }
    default: {
      let linkDom = dom.window.document.querySelectorAll(".anime_list a");
      let links = [...linkDom]
        .map((el) => `${site}${el.getAttribute("href")}`)
        .filter((el) => !!el);
      return links;
    }
  }
};
export default getLinks;
