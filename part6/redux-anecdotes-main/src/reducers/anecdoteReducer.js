
  import { createSlice } from "@reduxjs/toolkit";
  import anecdoteService from '../services/anecdotes'
  
  const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
      addVote: (state, action) => {
        const anecdoteToChange = state.find((n) => n.id === action.payload);
        if (anecdoteToChange) {
          anecdoteToChange.votes += 1;
        }
      },
      createAnecdote: (state, action) => {
        { console.log('esto es lo que se crea: ', action.payload)
          state.push(action.payload) }
      },
      
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
    },
  });
  
  export const { addVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions;

  export const initializeAnecdotes = () =>{
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch(setAnecdotes(anecdotes))
    }
  }

  export const createAnecdote = (content, votes) => {
    return async dispatch => {
      const newAnecdote = await anecdoteService.createNew(content, votes)
      dispatch(appendAnecdote(newAnecdote))
    }
  }
  
  export default anecdoteSlice.reducer;