import express from "express";

import { NewsletterService } from "../services";

const router = express.Router();

router.post("/confirm", NewsletterService.confirm);

router.post("/subscribe", NewsletterService.subscribe);

router.post("/unsubscribe", NewsletterService.unsubscribe);

export default router;
