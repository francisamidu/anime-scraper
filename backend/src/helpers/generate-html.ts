import { Anime } from "../types";
import { getWeekYear } from "./get-week";

const generateHTML = (animes: Anime[]) => {
  const linkItems = animes
    .map((anime) => {
      return `<li>${anime.title} - <a href=${anime.link}>${anime.title}</a></li>`;
    })
    .join("");

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
  <ul>${linkItems}</ul>
</body>
</html>
`;
  return htmlString;
};
export default generateHTML;
