import React from 'react';
import './App.css';
import BubbleChart from './BubbleChart'
// TODO: read from DB instead of from a file
import data from './resultsWithSentiment.json';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BubbleChart data={data}/>
      </header>
    </div>
  );
}

export default App;
