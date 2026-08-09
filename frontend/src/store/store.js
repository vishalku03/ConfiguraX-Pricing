import {
  configureStore
} from "@reduxjs/toolkit";

import authReducer
  from "./slices/authSlice";

import componentReducer
  from "./slices/componentSlice";

import configurationReducer
  from "./slices/configurationSlice";

import uiReducer
  from "./slices/uiSlice";

export const store =
  configureStore({

    reducer: {

      auth: authReducer,

      components:
        componentReducer,

      configurations:
        configurationReducer,

      ui: uiReducer

    }
  });