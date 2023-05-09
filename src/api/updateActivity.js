import client from "./client4";

const updateActivity = (activity) =>
  client.post("/UpDate_BP_Activity", activity);

export default {
  updateActivity,
};
