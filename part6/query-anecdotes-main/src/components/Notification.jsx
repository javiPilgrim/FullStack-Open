import React, { useContext } from 'react';
import { AnecdoteContext } from '../anecdoteContext';

const Notification = () => {
  const { counter } = useContext(AnecdoteContext);
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5
  }
  

  return (
    <div style={style}>
      {counter}
    </div>
  )
}

export default Notification
