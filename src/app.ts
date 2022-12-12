import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { join } from "path";
import logger from "./middleware/rootLogger";
import { queryHTML } from "./helpers";
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
    : "mongodb://localhost:27017/anime-scraper";

//cors middleware config
app.use(cors());

const initApp = async () => {
  try {
    const data = await queryHTML();
    console.log(data);
  } catch (err: any) {
    const error = new Error(err);
    logger("error", error);
  }
};

app.use("/api", api);

connect(`${MONGOB_URL}`)
  .then(() => {
    initApp();
    app.listen(PORT, () => {
      logger("Info", {
        name: "Info",
        message: `Server app runnning on port: ${PORT}`,
      });
    });
  })
  .catch((error: Error) =>
    console.log(`Failed to establish a database connection: ${error.message}`)
  );
