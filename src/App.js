import './styles.css';
import '../node_modules/react-vis/dist/style.css';
import React, {useEffect, useState} from 'react';
import { XYPlot, VerticalGridLines, HorizontalGridLines, XAxis, YAxis, VerticalBarSeries } from 'react-vis';

const App = () => {

  // saving results in Hooks
  // const [results, setResults] = useState([])
  const [finalScore, setFinalScore] = useState(0)
  const [workScore, setWorkScore] = useState(0)
  const [financeScore, setFinanceScore] = useState(0)
  const [socialScore, setSocialScore] = useState(0)
  const [leisureScore, setLeisureScore] = useState(0)
  const [healthScore, setHealthScore] = useState(0)
  const [myData, setMyData] = useState([])

  // Fetching Data.json data
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('data.json', {
  //         headers : { 
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //           }
  //         })

  //       if (response.status === 200) {
  //         const results = await response.json()
  //         console.log(results)

  //       }
  //     } catch(errors) {
  //       console.log(errors)
  //     }
  //   }
    
  //   fetchData()

  // }, [])

  // Calculate the ponderated score
  const calculate = (resultat) => {
    const scoreArray = [];

    resultat.forEach(score => {
      if (score.choixPatient === "A") {
        const finalScore = (score.ponderation * score.valeurReponseA);
        scoreArray.push(parseInt(finalScore));

        // console.log(finalScore);
      } else {
        const finalScore = (score.ponderation * score.valeurReponseB);
        scoreArray.push(parseInt(finalScore));
      }
    });

    const sum = scoreArray.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  };

  // Fetching Data.json data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('data.json', {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
            }
          })

        if (response.status === 200) {
          const results = await response.json()

          // All differents scores 
          const workScore = calculate(results.work)
          setWorkScore(workScore)
          const financeScore = calculate(results.finance)
          setFinanceScore(financeScore)
          const socialScore = calculate(results.social)
          setSocialScore(socialScore)
          const leisureScore = calculate(results.leisure)
          setLeisureScore(leisureScore)
          const healthScore = calculate(results.health)
          setHealthScore(healthScore)

          const finalScore = (workScore + financeScore + socialScore + leisureScore + healthScore) / 5
          setFinalScore(finalScore)

          const myData = [
            {x: 'Work', y: workScore},
            {x: 'Finance', y: financeScore},
            {x: 'Social', y: socialScore},
            {x: 'Leisure', y: leisureScore},
            {x: 'Health', y: healthScore}
          ]
          setMyData(myData)

        }
      } catch(errors) {
        console.log(errors)
      }
    }
    fetchData();

  }, [])

  // const myData = [
  //   {x: 'Work', y: 18},
  //   {x: 'Finance', y: 12},
  //   {x: 'Social', y: 8},
  //   {x: 'Leisure', y: 19},
  //   {x: 'Health', y: 12}
  // ]

  return (
    <div className="App">
      <div className='container'>
        <div className='graph'>
          <h1>New Graph</h1>

          {/* Show GRAPH */}
          <div className='chart'>
            <XYPlot xType="ordinal" height={400} width={780}  xDistance={100}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis />
              <YAxis />
              <VerticalBarSeries data={myData} color="#F6836A"/>
            </XYPlot>
            <p>Work Score : {workScore}</p>
            <p>Finance Score : {financeScore}</p>
            <p>Social Score : {socialScore}</p>
            <p>Leisure Score : {leisureScore}</p>
            <p>Health Score : {healthScore}</p>
            <p className='total'>Total Score : {finalScore}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

