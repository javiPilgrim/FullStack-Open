import { useState } from "react";

const Statistic = (props) => {
  if (props.total === 0) {
    return (
      <>
        <h3>No feedback given</h3>{" "}
      </>
    );
  }
  return (
    <>

      <StatisticLine text="Good: " value={props.good} />
      <StatisticLine text="Neutral: " value={props.neutral} />
      <StatisticLine text="Bad: " value={props.bad} />
      <StatisticLine text="Total: " value={props.total} />
      <StatisticLine text="Average: " value={props.average} />
      <StatisticLine text="Positive: " value={props.positive} />
    </>
  );
};

const StatisticLine = (props) => {
  return (
    <>
      <table>
        <tbody>
        <tr>
          <td style={{ width: '70px' }}>{props.text}</td>
          <td>{props.value}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
};

const Button = (props) => {
  return (
    <>
      <button onClick={props.click1}>{props.text1}</button>
      <button onClick={props.click2}>{props.text2}</button>
      <button onClick={props.click3}>{props.text3}</button>
    </>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGoodClick = () => {
    const updateGood = good + 1;
    const updateTotal = total + 1;
    const newAverage = (updateGood - bad) / updateTotal;
    const newPositive = (updateGood * 100) / updateTotal;

    // Update state with new values
    setGood(updateGood);
    setTotal(updateTotal);
    setAverage(newAverage);
    setPositive(newPositive);
    console.log(updateGood, neutral, bad, updateTotal, newAverage);
  };

  const handleNeutralClick = () => {
    const updateNeutral = neutral + 1;
    const updateTotal = total + 1;
    const newAverage = (good - bad) / updateTotal;
    const newPositive = (good * 100) / updateTotal;

    // Update state with new values
    setNeutral(updateNeutral);
    setTotal(updateTotal);
    setAverage(newAverage);
    setPositive(newPositive);
    console.log(good, updateNeutral, bad, updateTotal, newAverage);
  };

  const handleBadClick = () => {
    const updateBad = bad + 1;
    const updateTotal = total + 1;
    const newAverage = (good - updateBad) / updateTotal;
    const newPositive = (good * 100) / updateTotal;

    // Update state with new values
    setBad(updateBad);
    setTotal(updateTotal);
    setAverage(newAverage);
    setPositive(newPositive);
    console.log(good, neutral, updateBad, updateTotal, newAverage);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button
        click1={handleGoodClick}
        text1="Good"
        click2={handleNeutralClick}
        text2="Neutral"
        click3={handleBadClick}
        text3="Bad"
      />
      <h2>Statistic</h2>
      <Statistic
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average.toFixed(1)}
        positive={`${positive.toFixed(1)} %`}
      />
      </div>

  );
};

export default App;
