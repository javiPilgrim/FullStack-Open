import React, { useContext } from 'react';
import { AnecdoteContext } from '../anecdoteContext';
import { addAnecdote } from "../requests"
import { useMutation, useQueryClient } from '@tanstack/react-query'


const AnecdoteForm = () => {
  const { counterDispatch } = useContext(AnecdoteContext);

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: addAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
   })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

      if (content.length < 5) {
        counterDispatch({ type: "ERROR", message: "too short anecdote. Must have lengh 5 or more" });
        setTimeout(() => {
          counterDispatch({ type: "CLEAR" })
        }, 5000)
        return;
      }

    newAnecdoteMutation.mutate({ content, votes: 0 })
    counterDispatch({ type: "NEWANECDOTE", content: content});
    setTimeout(() => {
      counterDispatch({ type: "CLEAR" })
    }, 5000) 
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
