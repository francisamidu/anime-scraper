import { AnimeLite } from "../types";

const removeUndefined = (array_: AnimeLite[]) => {
  return array_.filter((el) => {
    if (!el?.image || !el?.link || !el?.title) {
      return false;
    }
    return true;
  });
};
export default removeUndefined;
