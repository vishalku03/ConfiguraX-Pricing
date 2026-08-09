import api from "./api";

export const loginUser = async (
  email,
  password
) => {
  const response = await api.post(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return response.data;
};



export const getCurrentUser =
  async () => {
    const response =
      await api.get("/auth/me");

    return response.data;
  };



export const logoutUser = () => {
  localStorage.removeItem("token");

  localStorage.removeItem("user");

  localStorage.removeItem(
    "isAuthenticated"
  );
};



export const saveAuthSession = (
  authData
) => {
  if (!authData) {
    return;
  }

  const {
    token,
    user,
  } = authData;

  if (token) {
    localStorage.setItem(
      "token",
      token
    );
  }

  if (user) {
    localStorage.setItem(
      "user",
      JSON.stringify(user)
    );
  }

  localStorage.setItem(
    "isAuthenticated",
    "true"
  );
};



export const isAuthenticated =
  () => {
    const token =
      localStorage.getItem(
        "token"
      );

    const user =
      localStorage.getItem(
        "user"
      );

    return Boolean(
      token && user
    );
  };