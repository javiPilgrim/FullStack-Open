import { useSelector, useDispatch } from "react-redux";
import { newVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => {
    return state.filter !== "ALL"
      ? state.anecdotes.filter((anecdote) =>
          anecdote.content.includes(state.filter)
        )
      : state.anecdotes;
  });

  const vote = (id, content) => {
    dispatch(newVote(id));
    dispatch(setNotification(`You voted ${content}`, 5));
  };

  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>
            vote
          </button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
