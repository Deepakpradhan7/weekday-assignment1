
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allJobs : [],
  loading : false
};

const allJobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setAllJobs(state, action) {
      state.allJobs = action.payload;
    },
    setLoading (state, action){
        state.loading = action.payload
    }
  },
});

export const {
    setAllJobs,
    setLoading
  
} = allJobsSlice.actions;

export default allJobsSlice.reducer;
