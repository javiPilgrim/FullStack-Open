import React from 'react'

const Course = ({course, parts}) => {
    const totalExercises = parts.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.exercises
      }, 0)
  
    return(
      <>
        <Header course={course} />
        <Content parts={parts} />
        <Total sum = {totalExercises} />
      </>
    )
  }
  
  
  const Header = ({ course }) => <h2>{course}</h2>
  
  
  const Part = ({ part }) => 
    <p>
      {part.name} {part.exercises}
    </p>
  
  const Content = ({ parts }) => 
      parts.map((result, i) => <Part key = {i} part={result} />)
  
  const Total = ({ sum }) => <h4>Number of exercises {sum}</h4>
  
  export default Course