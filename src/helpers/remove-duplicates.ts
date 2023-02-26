export default (array_: any[]) => {
  return array_.filter(
    (v, i, a) =>
      a.findIndex((v2) => ["title", "link"].every((k) => v2[k] === v[k])) === i
  );
};
