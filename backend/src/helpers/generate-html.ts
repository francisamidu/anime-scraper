import { Anime } from "../types";
import { getWeekYear } from "./get-week";
import animeNames from "../shared/animes";

const generateHTML = (animes: Anime[]) => {
  const likedAnimes: Anime[] = [];
  const allAnimes = animes
    .map((anime) => {
      return `<li><a href=${anime.link}>${anime.title}</a></li>`;
    })
    .join("");

  const animesLiked = likedAnimes
    .map((anime) => {
      return `<li><a href=${anime.link}>${anime.title}</a></li>`;
    })
    .join("");

  for (let name of animeNames) {
    const matchedAnime = animes.find((anime) =>
      anime.title.toLowerCase().includes(name.toLowerCase())
    );
    if (matchedAnime) likedAnimes.push(matchedAnime);
  }

  const htmlString = `
    <html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Anime update week #${getWeekYear()}</title>
</head>
<body>
  <h1 class="font-bold text-center">Anime update week #${getWeekYear()}</h1>
  
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <style>
        :root {
          --color-main: #0f0505;
          --color-var: #08525f;
        }
        * {
          box-sizing: border-box;
          font-family: "Inter", Helvetica, sans-serif;
          color: var(--color-main);
        }
  
        body {
          padding: 0;
          margin: 0;
        }
        h1,
        h2 {
          color: var(--color-var);
        }
  
        a {
          color: var(--color-var);
          text-decoration: none;
        }
        li {
          list-style-type: decimal;
          margin-bottom: 5px;
        }
        .content {
          max-width: 600px;
          margin: 10px auto;
          min-height: 90vh;
        }
  
        @media screen and (max-width: 600px) {
          .content {
            padding: 1em 5em;
          }
        }
        ul {
          padding-left: 0;
        }
        h2 {
          text-align: center;
          font-weight: bold;
        }
  
        footer {
          text-align: center;
          padding: 1em;
        }
      </style>
      <title>Anime updates</title>
    </head>
    <body>
      <div class="main">
        <h2>Anime Updates for Week #4</h2>
        <div class="content">
          <h3>Liked Animes</h3>
          <ul class="animes-liked">${animesLiked}</ul>
        </div>
        <div class="content">
          <h3>All Animes</h3>
          <ul class="animes-all">${allAnimes}</ul>
        </div>
      </div>
      <footer>&copy; ${getWeekYear()} - Anime scraper</footer>
    </body>
  </html>
`;
  return htmlString;
};
export default generateHTML;
