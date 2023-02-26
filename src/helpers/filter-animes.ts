import animes from "../shared/animes";
import { Anime } from "../types";
const filterAnimes = (animeList: Anime[]) => {
  try {
    return animeList.map((anime, index) => {
      const res = anime.title
        .toLowerCase()
        .includes(animes[index]?.toLowerCase())
        ? anime
        : "";
      return res;
    });
    //   .filter((anime) => !!anime);
  } catch (error) {
    console.log(error);
    return [];
  }
};
export default filterAnimes;
