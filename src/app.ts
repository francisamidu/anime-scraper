import express from "express";
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

//Init server app
const app = express();

//Constants
const PORT = Number(process.env.PORT) || 8081;

//cors middleware config
app.use(cors());

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
      // const animes = await queryHTML();
      // const html = generateHTML(animes);
      // sendEmail(html, `Anime updates for you week #${getWeek()}`);
      scheduleTask("* * * * * 7", async () => {
        try {
          const animes = await queryHTML();
          // const html = generateHTML(animes);
          // sendEmail(html, `Anime updates for you week #${getWeek()}`);
        } catch (error) {
          const msg = getErrorMessage(error);
          console.log(msg);
        }
      });
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  