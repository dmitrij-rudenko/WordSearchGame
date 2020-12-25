import axios from "axios";

const API_HOST = "http://localhost:3001";
const HEADER_CONTENT_TYPE = {
  "Content-type": "application/json"
};

export default class PublicAPI {
  static async http({ url, headers, body, method }) {
    const ENDPOINT = `${API_HOST}/${url}`;
    const CONFIG = {
      url: ENDPOINT,
      method,
      headers: {
        ...HEADER_CONTENT_TYPE,
        ...headers
      },
      data: {
        ...body
      }
    };
    let res;
    try {
      res = await axios(CONFIG);
      res = res.data;
    } catch (err) {
      res = {
        status: "error",
        error: err.message
      };
    }
    return res;
  }

  static get(url) {
    return PublicAPI.http({ url, method: "get" });
  }

  static post(url, body) {
    return PublicAPI.http({ url, body, method: "post" });
  }

  static put(url, body) {
    return PublicAPI.http({ url, body, method: "put" });
  }

  static delete(url) {
    return PublicAPI.http({ url, method: "delete" });
  }

  static getWord() {
    return PublicAPI.get("word");
  }
}
