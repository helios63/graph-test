import './styles.css';
import React, {useEffect, useState} from 'react';
import RadialChart from 'react-vis/dist/radial-chart';

const App = () => {

  // saving results in Hook
  const [results, setResults] = useState([])
  const [finalScore, setFinalScore] = useState(0)

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
        scoreArray.push(finalScore);

        // console.log(finalScore);
      } else {
        const finalScore = (score.ponderation * score.valeurReponseB);
        scoreArray.push(finalScore);
      }
    });

    const sum = scoreArray.reduce((partialSum, a) => partialSum + a, 0);
    return sum;
  };

  // Fetching Data.json data
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
        // console.log(results)
        setResults(results)

          // All differents scores 
          const workScore = calculate(results.work)
          const financeScore = calculate(results.finance)
          const socialScore = calculate(results.social)
          const leisureScore = calculate(results.leisure)
          const healthScore = calculate(results.health)

          const finalScore = (workScore + financeScore + socialScore + leisureScore + healthScore) / 5
          setFinalScore(finalScore)
      }
    } catch(errors) {
      console.log(errors)
    }
  }
  
  fetchData();
  // console.log(results)

  const myData = [{angle: 1}, {angle: 5}, {angle: 2}]

  return (
    <div className="App">
      <div className='container'>
        <h1>New Graph</h1>

        {/* Show GRAPH */}
        <div className='chart'>
          <RadialChart
            data={myData}
            width={780}
            height={400} />
            <p>Score : {finalScore}</p>
        </div>

      </div>
    </div>
  );
}

export default App;
