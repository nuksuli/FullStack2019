import React from "react";

const Header = ({ name }) => {
  return <h1>{name}</h1>;
};

const Exercises = ({ parts }) => {
  return parts.map(part => (
    <p key={part.id}>
      {part.name}
      {" "}
      {part.exercises}
    </p>
  ));
};

const Total = ({ parts }) => {
  const total = parts.reduce((t, part) => part.exercises + t, 0);
  return <h2>total of {total} exercises</h2>;
};
const Course = ({ courses }) => {
  return courses.map((c, i) => (
    <div key={i}>
      <Header name={c.name} />
      <Exercises parts={c.parts} />
      <Total parts={c.parts} />
    </div>
  ));
};

export default Course;
