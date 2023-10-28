import axios from "axios";

export default class FakeYoutube {
  constructor() {}

  async search(keyword) {
    return keyword ? this.#searchBykeyword(keyword) : this.#mostPopular();
  }

  async #searchBykeyword() {
    return axios
      .get(`/videos/search.json`)
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
