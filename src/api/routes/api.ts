const router = require("express").Router();

import { newsletterController } from "../controllers";

// Register routes
router.use("/newsletter", newsletterController);

export default router;
