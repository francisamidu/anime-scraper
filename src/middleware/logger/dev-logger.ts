import { format, createLogger, transports } from "winston";
const { timestamp, combine, colorize, errors, printf } = format;

const buildDevLogger = () => {
  const logFormat = printf(({ message, timestamp, stack }) => {
    return `${timestamp} - ${stack ? stack : ""} ${message}`;
  });
  return createLogger({
    format: combine(
      colorize({
        colors: { info: "blue", error: "red" },
        all: true,
        message: true,
      }),
      timestamp({ format: "YY-MM-DD HH:mm:ss" }),
      errors({ stack: true }),
      logFormat
    ),
    transports: [new transports.Console()],
  });
};

export default buildDevLogger;
