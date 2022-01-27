import './styles.css';
import React, {useEffect} from 'react';
import RadialChart from 'react-vis/dist/radial-chart';

const App = () => {

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
        }
      } catch(errors) {
        console.log(errors)
      }
    }

    fetchData()

  }, [])

  // Calculate the ponderated score
  const Calculate = () => {

  }

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
