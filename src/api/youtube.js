import axios from "axios";

export default class Youtube {
  constructor() {
    this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    });
  }

  async search(keyword) {
    return keyword ? this.#searchBykeyword(keyword) : this.#mostPopular();
  }

  async #searchBykeyword(keyword) {
    return this.httpsClient
      .get(`search`, {
        params: {
          part: "snippet",
        },
      })
      .then((res) => res.data.items)
      .then((items) => items.map((item) => ({ ...item, id: item.id.videoId })))
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        console.log("네트워크 통신 확인");
      });
  }

  async #mostPopular() {
    return axios
      .get(`/videos/popular.json`)
      .then((res) => res.data.items)
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        console.log("네트워크 통신 확인");
      });
  }
}
