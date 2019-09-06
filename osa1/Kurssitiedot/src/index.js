

import React from 'react'
import ReactDOM from 'react-dom'
const Header = (props) => {
    return (
        <div>
            <p> {props.course} </p>
        </div>
    )
}


const Content = (props) => {
    const values = props.parts;
    return (
        values.map((value) => 
        <div>
            <p> {value.name} {value.exercises} </p>
        </div>)
    )
}

const Total = (props) => {

    return (
        <div>
            <p>yhteensä {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises} tehtävää</p>
        </div>
    )
}
const App = () => {
    const course = {
        name: 'Half Stack -sovelluskehitys',
        parts: [
          {
            name: 'Reactin perusteet',
            exercises: 10
          },
          {
            name: 'Tiedonvälitys propseilla',
            exercises: 7
          },
          {
            name: 'Komponenttien tila',
            exercises: 14
          }
        ]
      }

  return (
    <div>
        <Header course = {course.name} />
        <Content
            parts = {course.parts}
        />
        <Total
            parts = {course.parts}
        />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))