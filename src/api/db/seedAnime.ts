import { Anime } from "./models";
import { connect, disconnect } from "mongoose";
import { queryHTML } from "../../helpers";

// Creates a test and admin account for testing purposes
const seed = async () => {
  try {
    const data = await queryHTML();
    console.log(data.keys());
    Promise.all(
      data.map(async (anime) => {
        const newAnime = new Anime({
          ...anime,
        });
        await newAnime.save();
      })
    );
    console.log(`seeded anime data`);
  } catch (error) {
    console.log(`Seed failed:${error}`);
    disconnect();
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
