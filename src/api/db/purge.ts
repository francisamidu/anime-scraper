import { connect } from "mongoose";
import { logger } from "../../middleware";

const { npm_package_name } = process?.env;
//Database connection
connect(`mongodb://localhost:27017/${npm_package_name}`)
  .then(async (res) => {
    try {
      await res.connections[0].collections["animes"].drop();
      logger("info", {
        name: "Info",
        message: `Deleted database ${npm_package_name} successfully`,
      });
      process.exit();
    } catch (error) {
      logger("info", {
        message: `Process failed: ${error}`,
        name: "Error",
      });
      process.exit();
    }
  })
  .catch((error) => logger("info", error));
