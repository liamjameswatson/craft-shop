import axios from "axios";

const BASE_URL = "http://localhost:8000/api/";

let TOKEN = "";
const localStorageData = localStorage.getItem("persist:root");
if (localStorageData) {
  const parsedData = JSON.parse(localStorageData);
  const user = JSON.parse(parsedData.user);
  if (user && user.currentUser && user.currentUser.accessToken) {
    TOKEN = user.currentUser.accessToken;
  }
}

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  headers: { token: `Bearer ${TOKEN}` },
});

userRequest.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.message === "Cannot read properties of null (reading 'accessToken')") {
      // Redirect to login page or handle the error as desired
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
