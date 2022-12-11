import { connect } from "mongoose";

const { npm_package_name } = process?.env;
//Database connection
connect(`mongodb://localhost:27017/${npm_package_name}`)
  .then(async (res) => {
    try {
      await res.connections[0].dropDatabase();
      console.log(`Deleted database ${npm_package_name} successfully`);
      process.exit();
    } catch (error) {
      console.log(`Process failed: ${error}`);
      process.exit();
    }
  })
  .catch((error) => console.log(error));
