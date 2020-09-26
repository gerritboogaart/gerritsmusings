import React from 'react';
import './App.css';

function App() {
  const fetching = () => fetch('./test').then((res) => console.log('this', res));
  const getServer = () => fetch('/');
  getServer();
  fetching();
  return (
    <div className="App">
      Hello app!!!!
    </div>
  );
}

export default App;
