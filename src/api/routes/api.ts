const router = require("express").Router();

import { use } from "../../middleware";
import { AnimeController } from "../controllers";

// Register routes
router.use("/", use(AnimeController));

export default router;
