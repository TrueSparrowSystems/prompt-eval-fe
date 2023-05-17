import { createSlice } from '@reduxjs/toolkit';

// Sample Code to create a slice of reducers
export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    increment: (state) => {
      state.value = state.value + 1;
    },
    decrement: (state) => {
      state.value = state.value - 1;
    },
    incrementByTwo: (state) => {
      state.value = state.value + 2;
    }
  }
});

export const selectCount = (state) => state.counter.value;
export const { increment, decrement, incrementByTwo } = counterSlice.actions;
export default counterSlice.reducer;
