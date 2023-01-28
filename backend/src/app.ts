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
import { api } from "./api/routes";
import { connect } from "mongoose";

//Env config

//Init server app
const app = express();

//Constants
const PORT = Number(process.env.PORT) || 8081;
const MONGOB_URL =
  app.get("env") === "production"
    ? process.env.MONGODB_URL
    : "mongodb://127.0.0.1:27017/anime-scraper?readPreference=primary&directConnection=true";

//cors middleware config
app.use(cors());

app.use("/api", api);
connect(`${MONGOB_URL}`)
  .then(async () => {
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
          const html = generateHTML(animes);
          sendEmail(html, `Anime updates for you week #${getWeek()}`);
        } catch (error) {
          const msg = getErrorMessage(error);
          console.log(msg);
        }
      });
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  })
  .catch((error) => {
    console.log(getErrorMessage(error));
  });
