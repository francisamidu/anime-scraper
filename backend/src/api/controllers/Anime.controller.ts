import express from "express";
import { check } from "express-validator";
import { use } from "../../middleware";

import { AnimeService } from "../services";

const router = express.Router();

router.get("/", use(AnimeService.index));
router.get("/animes", use(AnimeService.animes));
router.get("/anime/:animeId", use(AnimeService.anime));
router.post(
  "/create-anime",
  [
    check("image").isLength({
      min: 2,
    }),
    check("link").isLength({
      min: 2,
    }),
    check("title").isLength({
      min: 2,
    }),
  ],
  use(AnimeService.create)
);
router.delete("/delete-anime", use(AnimeService.delete));
router.post("/update-anime", use(AnimeService.update));

export default router;
