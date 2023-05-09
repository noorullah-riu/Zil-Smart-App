import client from "./commonApi";

const assignInquiry = (EnqId, AssignedTo) =>
  client.post(`/UpdateEnquiry?EnqId=${EnqId}&AssignedTo=${AssignedTo}`);
export default {
  assignInquiry,
};
