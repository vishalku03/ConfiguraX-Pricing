import { createSlice } from "@reduxjs/toolkit";


const getSavedAuth = () => {
  try {
    const savedAuth =
      localStorage.getItem(
        "lps_auth"
      );

    if (!savedAuth) {
      return null;
    }

    return JSON.parse(savedAuth);
  } catch (error) {
    console.error(
      "Unable to read saved authentication:",
      error
    );

    localStorage.removeItem(
      "lps_auth"
    );

    return null;
  }
};

const savedAuth =
  getSavedAuth();



const initialState = {
  user:
    savedAuth?.user || null,

  token:
    savedAuth?.token || null,

  isAuthenticated:
    Boolean(
      savedAuth?.token
    ),
};



const authSlice =
  createSlice({
    name: "auth",

    initialState,

    reducers: {
      

      loginSuccess(
        state,
        action
      ) {
        const {
          user,
          token,
        } =
          action.payload;

        state.user =
          user || null;

        state.token =
          token || null;

        state.isAuthenticated =
          Boolean(token);

        // Save complete auth session
        localStorage.setItem(
          "lps_auth",
          JSON.stringify({
            user:
              user || null,

            token:
              token || null,
          })
        );
      },

      

      logout(state) {
        state.user = null;

        state.token = null;

        state.isAuthenticated =
          false;

        localStorage.removeItem(
          "lps_auth"
        );

        // Remove old/legacy auth keys too
        localStorage.removeItem(
          "token"
        );

        localStorage.removeItem(
          "user"
        );

        localStorage.removeItem(
          "isAuthenticated"
        );
      },

      

      restoreSession(
        state
      ) {
        const auth =
          getSavedAuth();

        state.user =
          auth?.user || null;

        state.token =
          auth?.token || null;

        state.isAuthenticated =
          Boolean(
            auth?.token
          );
      },
    },
  });


export const {
  loginSuccess,
  logout,
  restoreSession,
} =
  authSlice.actions;



export default authSlice.reducer;