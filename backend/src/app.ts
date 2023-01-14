import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { join } from "path";
import logger from "./middleware/rootLogger";
import { getDaysInMonth, scheduleTask } from "./helpers";
import { api } from "./api/routes";
import { connect } from "mongoose";

//Env config
config({
  path: join(__dirname, "..", "config"),
});

//Init server app
const app = express();

//Constants
const PORT = Number(process.env.PORT) || 5000;
const MONGOB_URL =
  app.get("env") === "production"
    ? process.env.MONGODB_URL
    : "mongodb://127.0.0.1:27017/anime-scraper?readPreference=primary&directConnection=true";

//cors middleware config
app.use(cors());

app.use("/api", api);
connect(`${MONGOB_URL}`)
  .then(() => {
    app.listen(PORT, () => {
      logger("Info", {
        name: "Info",
        message: `Server app runnning on port: ${PORT}`,
      });
    });
  })
  .catch((error) => {
    logger("Error", {
      name: "Error",
      message: `Connection error: ${error.message}`,
    });
  });
