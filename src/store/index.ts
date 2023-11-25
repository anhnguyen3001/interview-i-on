import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import builderReducer from "modules/builder/builderSlice";

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

export const store = configureStore({
  reducer: {
    builder: builderReducer,
  },
  middleware: customizedMiddleware,
});
