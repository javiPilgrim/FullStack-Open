import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    addVote: (state, action) => {
      const index = state.findIndex((n) => n.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    appendAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(setAnecdotes(anecdotes));
  };
};

export const createAnecdote = (content, votes) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content, votes);
    dispatch(appendAnecdote(newAnecdote));
  };
};

export const newVote = (id) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(id);
    dispatch(addVote(updatedAnecdote));
  };
};

export default anecdoteSlice.reducer;
