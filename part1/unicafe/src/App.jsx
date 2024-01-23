import { useState } from "react";


// comoponent for creating all application statistics
// if there are no statistics, just print: "no feedback given"
const Statistic = ({total, good, neutral, bad, average, positive}) => {
  if (total === 0) {
    return (
      <>
        <h3>No feedback given</h3>{" "}
      </>
    );
  }
  return (
    <>

      <StatisticLine text="Good: " value={good} />
      <StatisticLine text="Neutral: " value={neutral} />
      <StatisticLine text="Bad: " value={bad} />
      <StatisticLine text="Total: " value={total} />
      <StatisticLine text="Average: " value={average} />
      <StatisticLine text="Positive: " value={positive} />
    </>
  );
};

// component for the creation of autonomous statistics lines
const StatisticLine = ({value, text}) => {
  return (
    <>
      <table>
        <tbody>
        <tr>
          <td style={{ width: '70px' }}>{text}</td> 
          <td>{value}</td>
        </tr>
        </tbody>
      </table>
    </>
  );
};

// component for creating application buttons
const Button = ({click1, click2, click3, text1, text2, text3}) => {
  return (
    <>
      <button onClick={click1}>{text1}</button>
      <button onClick={click2}>{text2}</button>
      <button onClick={click3}>{text3}</button>
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

  // good button functionality
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

  // neutral button functionality
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

  // bad button functionality
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
