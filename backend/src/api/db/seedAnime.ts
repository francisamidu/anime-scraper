import { Anime } from "./models";
import { connect, disconnect } from "mongoose";
import { queryHTML } from "../../helpers";
import { Anime as IAnime } from "../../interfaces";
import logger from "../../middleware/rootLogger";

// Creates a test and admin account for testing purposes
const seed = async () => {
  try {
    const data = await queryHTML();
    Promise.all(
      data.map(async (anime: IAnime) => {
        const newAnime = new Anime({
          link: anime.link,
          image: anime.image,
          title: anime.title,
        });
        await newAnime.save();
      })
    ).finally(async () => {
      await disconnect();
    });
    logger("Info", {
      name: "Seeder",
      message: "seeded anime data",
    });
  } catch (error: any) {
    logger("Error", {
      name: "Seeder",
      message: `Seed failed:${error.message}`,
    });
    await disconnect();
  }
};

const runSeed = async () => {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  }
};

//Database connection
connect(`mongodb://localhost:27017/${process.env.npm_package_name}`, {
  autoIndex: true,
})
  .then(() => {
    runSeed();
  })
  .catch((error: any) => console.log(error));
