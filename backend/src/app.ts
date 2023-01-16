import express from "express";
import cors from "cors";

import logger from "./middleware/rootLogger";
import {
  getErrorMessage,
  getWeek,
  getWeekYear,
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
const PORT = Number(process.env.PORT) || 0;
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
      app.listen(PORT, () => {
        logger("Info", {
          name: "Info",
          message: `Server app runnning on port: ${PORT}`,
        });
      });
      const data = await queryHTML();
      sendEmail(
        String(data.length),
        `Anime updates for you week #${getWeek()}`
      );
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  })
  .catch((error) => {
    logger("Error", {
      name: "Error",
      message: `Connection error: ${error.message}`,
    });
  });
