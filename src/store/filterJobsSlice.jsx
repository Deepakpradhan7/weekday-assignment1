
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterJobs : [],
};

const filterJobsSlice = createSlice({
  name: 'filterJobs',
  initialState,
  reducers: {
    setFilterJobs(state, action) {
      state.filterJobs = action.payload;
    }
  },
});

export const {
    setFilterJobs,
  
} = filterJobsSlice.actions;

export default filterJobsSlice.reducer;
