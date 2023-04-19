import express from "express";
import { use } from "../../middleware";

import { NewsletterService } from "../services";

const router = express.Router();

router.get("/", NewsletterService.get);

router.post("/confirm", use(NewsletterService.confirm));

router.post("/subscribe", use(NewsletterService.subscribe));

router.post("/unsubscribe", use(NewsletterService.unsubscribe));

export default router;
