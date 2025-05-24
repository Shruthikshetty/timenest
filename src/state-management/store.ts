import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// app store containing all the slices
export const store = configureStore({
  reducer: {
    // add all the slices here
    // -------------------- add the slice in a separate file this is an example remove this once you add a slice -------------/
    example: createSlice({
      name: "inline",
      initialState: {},
      reducers: {},
    }).reducer,
    //----------------------------------------------------------------------------------------------------------------------/
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
