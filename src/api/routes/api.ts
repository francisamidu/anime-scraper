const router = require("express").Router();

import { newsletterController } from "../controllers";

import { use } from "../middlewares";

// Register routes
router.use("/newsletter", newsletterController);

export default router;
