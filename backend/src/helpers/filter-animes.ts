import animes from "../shared/animes";
const filterAnimes = (animeList: string[]) => {
  try {
    return animeList
      .map((anime, index) =>
        anime.toLowerCase().includes(animes[index].toLowerCase()) ? anime : ""
      )
      .filter((anime) => !!anime);
  } catch (error) {
    return [];
  }
};
export default filterAnimes;
