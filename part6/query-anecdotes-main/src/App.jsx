import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from "./requests"
import { useReducer } from "react"
import { AnecdoteContext } from "./anecdoteContext"

import AnecdoteForm from "./components/AnecdoteForm"
import Notification from "./components/Notification"

const counterReducer = (state, action) => {
  switch (action.type) {
    case "NEWANECDOTE": {
      const newState =  `Anecdote: "${action.content}" added`
      return newState
    }
    case "NEWVOTE": {
      const newState = `Anecdote: "${action.content}" voted`
      return newState
    }
    case "ERROR":
      return (state = action.message)
    case "CLEAR":
      return (state = "")
    default:
      return state
  }
}

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, "")

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] })
    },
    onError: (error) => {
      counterDispatch({
        type: "ERROR",
        message: "too short anecdote. Must have lengh 5 or more, try again",
      });
      setTimeout(() => {
        counterDispatch({ type: "CLEAR" });
      }, 5000)
    },
  })

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 1,
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading data...</div>
  }

  if (result.isError) {
    return (
      <div>
        <h2>Anecdote service not available due to problems in server</h2>
        <p>Please, try again later.</p>
      </div>
    )
  }

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }
    newAnecdoteMutation.mutate(updatedAnecdote);
    counterDispatch({ type: "NEWVOTE", content: anecdote.content })
    setTimeout(() => {
      counterDispatch({ type: "CLEAR" })
    }, 5000)
  };

  return (
    <AnecdoteContext.Provider value={{ counter, counterDispatch, handleVote }}>
      <div>
        <h3>Anecdote app</h3>

        <Notification />
        <AnecdoteForm />

        <div>
          {anecdotes.map((anecdote) => (
            <div key={anecdote.id}>
              <div>{anecdote.content}</div>
              <div>
                has {anecdote.votes}
                <button onClick={() => handleVote(anecdote)}>vote</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnecdoteContext.Provider>
  );
};

export default App
