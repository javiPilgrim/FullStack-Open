import { useSelector, useDispatch } from "react-redux";
import { newVote } from "../reducers/anecdoteReducer";
import { showNotification, clearNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => {
    return state.filter  !== 'ALL'
      ? state.anecdotes.filter(anecdote => anecdote.content.includes(state.filter))
      : state.anecdotes
  })
  

  const vote = (id) => {
    dispatch(newVote(id));
    dispatch(showNotification('Your vote has been added'))
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);

  };

  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
