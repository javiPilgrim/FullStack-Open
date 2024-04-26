import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { showNotification, clearNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async(event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    dispatch(createAnecdote(content, 0))
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