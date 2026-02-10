import { useState } from 'react'

const Feedback = ({ onGood, onNeutral, onBad }) => {
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={onGood}>good</button>
      <button onClick={onNeutral}>neutral</button>
      <button onClick={onBad}>bad</button>
    </div>
  )
}

const Average = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <p>average 0.0</p>
    )
  }

  return (
    <p>average {(good - bad) / (good + neutral + bad)}</p>
  )
}

const Positive = ({ good, neutral, bad }) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <p>positive 0.0%</p>
    )
  }

  return (
    <p>positive {(good) / (good + neutral + bad) * 100}%</p>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad
  const average = (all === 0) ? 0: (good - bad) / all
  const positive = (all === 0) ? 0: (good - bad) / all
  const positivePercent = `${positive * 100}%`

  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={all} />
          <StatisticLine text="average" value={average} />
          <StatisticLine text="positive" value={positivePercent} />
        </tbody>
      </table>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad + 1)
  
  return (
    <div>
      <Feedback onGood={handleGoodClick} onNeutral={handleNeutralClick} onBad={handleBadClick}/>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App