import axios from "axios";

export async function search(keyword) {
  return axios
    .get(`/videos/${keyword ? "search" : "popular"}.json`)
    .then((res) => res.data.items)
    .catch((error) => {
      console.log("error", error);
    })
    .finally(() => {
      console.log("네트워크 통신 확인");
    });
}
