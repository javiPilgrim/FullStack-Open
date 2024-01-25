const Course = ({course, parts}) => {
  return(
    <>
      <Header course={course} />
      <Content parts={parts} />
    </>
  )
}


const Header = ({ course }) => <h1>{course}</h1>

const Total = ({ sum }) => <p>Number of exercises {sum}</p>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => 
    parts.map((result, i) => <Part key = {i} part={result} />)


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      }
    ],
  }
  const totalExercises = course.parts.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.exercises
  }, 0)

  return (
    <div>
      <Course course={course.name} parts={course.parts} />

      <Total sum={totalExercises} />
    </div>
  )
}

export default App