import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://192.168.1.8:5555",
});

export default apiClient;
