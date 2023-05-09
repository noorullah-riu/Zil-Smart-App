import { create } from "apisauce";

const apiClient = create({
  baseURL: "http://110.36.229.140:44513/SAPAPI" ,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

const registerUser = (values) => apiClient.post('/CustomerSignUp',{"customer":values});

export default {
    registerUser,
};

