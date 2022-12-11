import axios from "axios";

const getHTML = async (url: string) => {
  try {
    const res = await axios({
      method: "GET",
      url,
      headers: { "Accept-Encoding": "gzip,deflate,compress" },
    });
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw error;
  }
};

export default getHTML;
