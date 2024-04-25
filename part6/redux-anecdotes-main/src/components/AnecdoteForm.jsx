import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification, clearNotification } from "../reducers/notificationReducer";
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async(event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    const newAnecdote = await anecdoteService.createNew(content, 0)
    console.log(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(showNotification("Se ha adjuntado una nueva anecdota"));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
  }


  return (

      <form onSubmit={addAnecdote}>
          <h2>create new</h2>
          <input name="anecdote" />
        <button type="submit">create</button>
      </form>
  )
}

export default AnecdoteForm