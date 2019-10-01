import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};
const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};
const Statistics = ({ good, neutral, bad }) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h2>Statistics</h2>
        <p>no feedback given</p>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Statistics</h2>
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text='all' value={bad+good+neutral}/>
            <Statistic
              text="average"
              value={(good - bad) / (good + neutral + bad)}
            />
            <Statistic text="positive" value={good / (good + neutral + bad)*100+ '%'}></Statistic>
          </tbody>
        </table>
      </div>
    );
  }
};
const Anecdote = ({ selected }) => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
  ];
  return <p>{anecdotes[selected]}</p>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [likes, setLikes] = useState(0)

  function test(points, selected) {
    const array = points
    array[selected] += 1
    setPoints([...array])
    setLikes(Math.max(...points))

  }

  const anecdoteWithMostLikes = () => {
    return points.indexOf(points.find(points => points === likes))
  }

  return (
    <div>
      <h1>give feedback </h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
      <Button
        onClick={() => setSelected(Math.floor(Math.random() * 6))}
        text="Anecdote"
      />
      <Anecdote selected={selected} />
      <Button
        onClick={() => test(points, selected)}
        text="vote"
      />
      <p>
        has {points[selected]} votes
      </p>
      <h2>Anecdote with most votes</h2>
      <Anecdote selected={anecdoteWithMostLikes()}/>
      has {points[anecdoteWithMostLikes()]} likes
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
