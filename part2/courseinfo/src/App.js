

const Courses = ({courses}) => {
  return(
    courses.map((x,i)=>
    <Course key = {i} course={x.name} parts={x.parts}/>
    )
  )
}

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


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]
  



  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />



    </div>
  )
}

export default App