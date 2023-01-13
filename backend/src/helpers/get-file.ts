import { promises } from "fs";
import { join } from "path";

export default async (path: string) => {
  try {
    const newPath = join(__dirname, "..", `../public/${path}`);
    const file = await promises.readFile(newPath);
    return file.toString();
  } catch (error) {
    throw error;
  }
};
