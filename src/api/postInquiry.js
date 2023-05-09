import client from "./commonApi";

const postInquiry = (inquiry) => client.post("/PostEnquiry", inquiry);

export default {
  postInquiry,
};
