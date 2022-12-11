import { model, Schema } from "mongoose";

const AnimeSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
    deleted: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("anime", AnimeSchema);
