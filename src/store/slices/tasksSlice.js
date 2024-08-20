import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch tasks based on current user
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const currentUser = localStorage.getItem("CurrentUser");

  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${currentUser[4]}/todos`
  );
  const data = await response.json();
  return data;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    addTasks(state, action) {
      state.tasks.unshift(action.payload);
    },
    updateTask(state, action) {
      const { title, changes } = action.payload;
      const task = state.tasks.find((task) => task.title === title);
      if (task) {
        Object.assign(task, changes);
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.title !== action.payload);
    },
    deleteAllTasks(state) {
      state.tasks = [];
    },
    setState(state,action){
        state.status = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addTasks, updateTask, deleteTask, deleteAllTasks,setState } =
  tasksSlice.actions;

export default tasksSlice.reducer;
