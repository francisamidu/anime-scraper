import logger from "./logger";
interface Information extends Error {
  information?: string | any;
}
export default (level: string, info?: Information) => {
  switch (level) {
    case "error": {
      logger.error(info?.message);
      break;
    }
    default: {
      let temp = info?.information ? `[${info.information}]` : "";
      logger.info(`${info?.message} ${temp}`);
      break;
    }
  }
};
