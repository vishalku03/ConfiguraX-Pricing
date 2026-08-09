import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";



const api = axios.create({
  baseURL: API_BASE_URL,

  headers: {
    "Content-Type":
      "application/json",
  },

  timeout: 15000,
});


const getAuthToken = () => {
  

  try {
    const savedAuth =
      localStorage.getItem(
        "lps_auth"
      );

    if (savedAuth) {
      const parsedAuth =
        JSON.parse(
          savedAuth
        );

      if (
        parsedAuth?.token
      ) {
        return parsedAuth.token;
      }
    }
  } catch (error) {
    console.error(
      "Unable to read authentication session:",
      error
    );
  }

 
  return localStorage.getItem(
    "token"
  );
};



api.interceptors.request.use(
  (config) => {
    const token =
      getAuthToken();

    if (token) {
      config.headers =
        config.headers || {};

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  },

  (error) => {
    return Promise.reject(
      error
    );
  }
);


api.interceptors.response.use(
  (response) => {
    return response;
  },

  (error) => {
    

    if (
      error.response?.status ===
      401
    ) {
      localStorage.removeItem(
        "lps_auth"
      );

      localStorage.removeItem(
        "token"
      );

      localStorage.removeItem(
        "user"
      );

      localStorage.removeItem(
        "isAuthenticated"
      );
    }

    return Promise.reject(
      error
    );
  }
);

export default api;