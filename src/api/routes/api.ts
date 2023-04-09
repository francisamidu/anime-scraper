const router = require("express").Router();

import { use } from "../../middleware";
import { newsletterController } from "../controllers";

// Register routes
router.use("/newsletter", use(newsletterController));

export default router;
