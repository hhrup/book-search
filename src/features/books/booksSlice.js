import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  author: '',
  skip: true,
}

export const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    searchParams: (state, action) => {
      state.title = action.payload.title;
      state.author = action.payload.author;
      state.skip = action.payload.skip;
    }
  }
});

export const { searchParams } = booksSlice.actions;

// selector function not necessary

export default booksSlice.reducer;
