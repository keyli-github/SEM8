import axios from "axios";

const rawApiBase = import.meta.env.VITE_API_URL;
const API_BASE = rawApiBase
  ? rawApiBase.replace(
      /^(https?:\/\/)?lab07-backend\.onrender\.com\/api/i,
      "https://lab07-backend-bh5m.onrender.com/api"
    )
  : "https://lab07-backend-bh5m.onrender.com/api";
const API_URL = API_BASE.replace(/\/$/, "") + "/auth/";

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (username, password) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
};

export default AuthService;