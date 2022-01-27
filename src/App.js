import './styles.css';
import React, {useEffect, useState} from 'react';
import RadialChart from 'react-vis/dist/radial-chart';

const App = () => {

  // Calculate the ponderated score
  const calculate = resultat => {
    const scoreArray = []
    resultat.map((score) => {
      if (score.choixPatient === 'A') {
        const finalScore = score.ponderation * score.valeurReponseA
        scoreArray.push(finalScore)
      } else {
        const finalScore = score.ponderation * score.valeurReponseB
        scoreArray.push(finalScore)
      }
    })
    const sum = scoreArray.reduce((partialSum, a) => partialSum + a, 0);
    return sum
  }
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
          console.log(results)
          const workScore = calculate(results.work)
          console.log(workScore)
        }
      } catch(errors) {
        console.log(errors)
      }
    }

    fetchData()

  }, [])

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
        </div>

      </div>
    </div>
  );
}

export default App;
