import axios from "axios";

const baseUrl = "https://iwt-backend.herokuapp.com";

export const getDetails = async () => {
  return await axios
    .get(`${baseUrl}/detail`)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const saveDetails = async (data) => {
  return await axios
    .post(`${baseUrl}/detail`, data)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
