import React from 'react';
import './App.css';
import BubbleChart from './BubbleChart'
// TODO: read from DB instead of from a file
import data from './resultsWithSentiment.json';
import StockTable from './StockTable';

function App() {
  return (
    <div className="App">
        <StockTable data={data}/>
        <BubbleChart data={data}/>
    </div>
  );
}

export default App;
