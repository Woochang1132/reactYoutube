//import axios from "axios";

export default class Youtube {
  constructor(apiClient) {
    this.apiClient = apiClient;

    /*  
      this.httpClient = axios.create({
      baseURL: "https://www.googleapis.com/youtube/v3",
      params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
    }); 
    */
  }

  async search(keyword) {
    return keyword ? this.#searchBykeyword(keyword) : this.#mostPopular();
  }

  async channelImageURL(id) {
    return this.apiClient
      .channels({ params: { part: "snippet", id: id } })
      .then((res) => res.data.items[0].snippet.thumbnails.default.url);
  }

  async relatedVideos() {
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items);
  }

  async #searchBykeyword(keyword) {
    return this.apiClient
      .search({
        params: {
          part: "snippet",
          maxResults: 25,
          type: "video",
          q: keyword,
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
    return this.apiClient
      .videos({
        params: {
          part: "snippet",
          maxResults: 25,
          chart: "mostPopular",
        },
      })
      .then((res) => res.data.items)
      .catch((error) => {
        console.log("error", error);
      })
      .finally(() => {
        console.log("네트워크 통신 확인");
      });
  }
}
