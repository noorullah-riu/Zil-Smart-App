import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://182.180.92.42:5555/CommonApi/",
});

export default apiClient;
