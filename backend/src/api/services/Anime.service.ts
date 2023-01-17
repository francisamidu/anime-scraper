import { Request, Response } from "express";
import { validationResult } from "express-validator";
import {
  filterAnimes,
  getErrorMessage,
  queryHTML,
  serializeValidationResult,
} from "../../helpers";
import { Anime as IAnime } from "../../types";
import { Anime } from "../db/models";
import animes from "../../shared/animes";

class AnimeService {
  static async index(_: Request, res: Response) {
    return res.status(200).json({ message: "Welcome to the anime API" });
  }
  static async animes(_: Request, res: Response) {
    try {
      let animeList = await queryHTML();
      // for (let index = 0; index < animes.length; index++) {
      //   const animeRes = await Anime.findOne({
      //     title: new RegExp("^" + animes[index], "i"),
      //   });
      //   animeList[index] = animeRes;
      // }
      // animeList = animeList.filter((anime) => !!anime);
      return res.status(200).json(animeList);
    } catch (error) {
      const err = getErrorMessage(error);
      console.log(err);
    }
  }
  static async create(req: Request, res: Response) {
    const { link, image, title } = req.body;
    //Validate credentials and send back response message
    const validationResults = validationResult(req).formatWith(
      serializeValidationResult
    );
    const results = validationResults.array();
    if (results.length) {
      return res.status(406).json(results);
    }
    const newAnime = new Anime({
      image,
      link,
      title,
    });
    await newAnime.save();
    return res.status(201).json({
      message: "Anime created",
      anime: {
        ...newAnime,
        _id: newAnime._id,
      },
      success: true,
    });
  }
  static async update(req: Request, res: Response) {
    const { link, image, title, animeId } = req.body;
    //Validate credentials and send back response message
    const validationResults = validationResult(req).formatWith(
      serializeValidationResult
    );
    const results = validationResults.array();
    if (results.length) {
      return res.status(406).json(results);
    }
    const anime = await Anime.findOne({ _id: animeId });

    if (!anime) {
      return res.status(404).json({ message: "Anime does'nt exist" });
    }

    anime.link = link || anime.link;
    anime.image = image || anime.image;
    anime.title = title || anime.title;
    await anime.save();
    return res.status(201).json({
      message: "Anime created",
      anime: {
        ...anime,
        _id: anime._id,
      },
      success: true,
    });
  }
  static async delete(req: Request, res: Response) {
    const { animeId } = req.body;
    //Validate credentials and send back response message
    const validationResults = validationResult(req).formatWith(
      serializeValidationResult
    );
    const results = validationResults.array();
    if (results.length) {
      return res.status(406).json(results);
    }
    const anime = await Anime.findById(animeId);
    if (anime) {
      anime.deleted = true;
      await anime.save();
    }
    return res.status(200).json({ message: "Anime deleted", success: true });
  }
  static async anime(req: Request, res: Response) {
    const anime = await Anime.findOne({
      _id: req.params.id,
    });
    return res.status(200).json(anime);
  }
}

export default AnimeService;
