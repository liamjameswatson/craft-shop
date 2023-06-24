import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./basketRedux";

export default configureStore({
  reducer: {
    basket: basketReducer,
  },
});
