import express,{json,urlencoded} from "express";
import cors from "cors";

import logger from "./middleware/rootLogger";
import {
  generateHTML,
  getErrorMessage,
  getWeek,
  queryHTML,
  scheduleTask,
  sendEmail,
} from "./helpers";
import { api } from "./api/routes";


//Init server app
const app = express();

//Constants
const PORT = Number(process.env.PORT) || 8081;

//cors middleware config
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: false }));

app.use("/api", api);

try {
  app
    .listen(PORT, () => {
      logger("Info", {
        name: "Info",
        message: `Server app runnning on port: ${PORT}`,
      });
    }) //   Fix the Error EADDRINUSE
    .on("error", () => {
      process.once("SIGUSR2", () => {
        process.kill(process.pid, "SIGUSR2");
      });
      process.on("SIGINT", () => {
        // this is only called on ctrl+c, not restart
        process.kill(process.pid, "SIGINT");
      });
    });
  // scheduleTask("* * * * * 1", async () => {
  //   try {
  //     const animes = await queryHTML();
  //     const html = generateHTML(animes);
  //     sendEmail(html, `Anime updates for you week #${getWeek()}`);
  //   } catch (error) {
  //     const msg = getErrorMessage(error);
  //     console.log(msg);
  //   }
  // });

} catch (error) {
  console.log(getErrorMessage(error));
}
