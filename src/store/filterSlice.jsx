
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedExp: null,
  selectedSalary: null,
  selectedCompany: '',
  selectedLocations: [],
  selectedJobRoles: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSelectedExp(state, action) {
      state.selectedExp = action.payload;
    },
    setSelectedSalary(state, action) {
      state.selectedSalary = action.payload;
    },
    setSelectedCompany(state, action) {
      state.selectedCompany = action.payload;
    },
    setSelectedLocations(state, action) {
      state.selectedLocations = action.payload;
    },
    setSelectedJobRoles(state, action) {
      state.selectedJobRoles = action.payload;
    },
  },
});

export const {
    setSelectedExp,
  setSelectedSalary,
  setSelectedCompany,
  setSelectedLocations,
  setSelectedJobRoles,
} = filterSlice.actions;

export default filterSlice.reducer;
