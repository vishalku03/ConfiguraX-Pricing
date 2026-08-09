const AUTH_KEY =
  "lps_auth";

const CONFIGURATIONS_KEY =
  "lps_configurations";

export const getAuth = () => {

  try {

    return JSON.parse(
      localStorage.getItem(
        AUTH_KEY
      ) || "null"
    );

  } catch {

    return null;

  }

};

export const setAuth = (
  value
) => {

  localStorage.setItem(
    AUTH_KEY,
    JSON.stringify(value)
  );

};

export const clearAuth = () => {

  localStorage.removeItem(
    AUTH_KEY
  );

};

export const getSavedConfigurations =
  () => {

    try {

      return JSON.parse(
        localStorage.getItem(
          CONFIGURATIONS_KEY
        ) || "[]"
      );

    } catch {

      return [];

    }

  };

export const setSavedConfigurations =
  (value) => {

    localStorage.setItem(
      CONFIGURATIONS_KEY,
      JSON.stringify(value)
    );

  };