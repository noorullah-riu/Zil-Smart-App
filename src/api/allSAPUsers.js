import client from "./client";

const getAllUsers = () => client.get("/GetAllSapUsers");

export default {
  getAllUsers,
};
