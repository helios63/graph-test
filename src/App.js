import './styles.css';
import React, {useEffect} from 'react';

const App = () => {

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

  return (
    <div className="App">
      <div className='container'>
        <h1>New Graph</h1>

      </div>
    </div>
  );
}

export default App;
