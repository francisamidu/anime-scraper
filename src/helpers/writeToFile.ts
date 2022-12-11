import { promises } from "fs";
import { join } from "path";
export default async (contents: string, name: string) => {
  try {
    const path = join(__dirname, "..", `../public/${name}`);
    await promises.appendFile(path, contents);
  } catch (error: any) {
    throw error;
  }
};
