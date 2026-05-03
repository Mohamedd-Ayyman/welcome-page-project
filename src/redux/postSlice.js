import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: { posts: [], loading: false },
  reducers: {
    setPosts: (state, action) => { state.posts = action.payload; },
    prependPost: (state, action) => { state.posts.unshift(action.payload); },
    addPost: (state, action) => { state.posts.push(action.payload); },
    setLoading: (state, action) => { state.loading = action.payload; },
  },
});

export const { setPosts, prependPost, addPost, setLoading } = postSlice.actions;
export default postSlice.reducer;
