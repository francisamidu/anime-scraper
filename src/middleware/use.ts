import { Request, Response, NextFunction } from "express";
import logger from "./rootLogger";

const use =
  (fun: (req: Request, res: Response, next: NextFunction) => any) =>
  (req: Request, res: Response, next: NextFunction) => {
    logger("info", {
      name: String(req.statusMessage),
      message: req.complete ? "Request complete" : "",
      information: req.ip,
    });
    return Promise.resolve(fun(req, res, next)).catch(next);
  };

export default use;
