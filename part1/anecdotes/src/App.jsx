import { useState } from 'react'

const Display = (props) => {
  return(
  <>
    <p>{props.anecdote}</p>
  </>
  )
}



const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]



  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([ 0, 0, 0, 0, 0, 0, 0, 0 ])
  const nextAnecdote = () =>{
    let randomNum = Math.floor(Math.random() * anecdotes.length);
    setSelected(randomNum)
    console.log(randomNum)
  }

  const isVote = ()=> {
    const copy = [...points]
    console.log(selected)
    console.log("copy: ",copy)
    copy[selected] +=1
    console.log("copy modificated: ",copy)
    setPoints(copy)
    console.log("points: ", points)
  }
  const moreVotes = ()=>{
    const max = Math.max(...points);
    const index = points.indexOf(max);
    return index
  }

  return (
    <div>
            <Display anecdote ={anecdotes[selected]}/>
            <p>Tiene {points[selected]} votos</p>
            <button onClick={nextAnecdote}>Next Anecdote</button>
            <button onClick={isVote}>Votar</button>
            <h2>Anecdote with more votes:</h2>
            <Display anecdote = {anecdotes[moreVotes()]} />

            

      </div>

  );
};

export default App;
