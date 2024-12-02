import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    loading: false,
    error: null,
  },
  reducers: {
    setLoading(state) {
      state.loading = true;
    },
    setProjects(state, action) {
      state.projects = action.payload;
      state.loading = false;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addProject(state, action) {
      state.projects.push(action.payload);
    },
  },
});

// Export actions
export const { setLoading, setProjects, setError, addProject } = projectSlice.actions;

// Define the async function to fetch projects
export const fetchProjects = () => async (dispatch) => {
  dispatch(setLoading());
  try {
    const response = await axios.get("/api/projects"); // Adjust API endpoint as necessary
    dispatch(setProjects(response.data));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export default projectSlice.reducer;
