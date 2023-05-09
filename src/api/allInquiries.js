import client from "./commonApi";

const getAllInquiries = () => client.get("GetEnquires?UserCode=-1");

export default {
  getAllInquiries,
};
