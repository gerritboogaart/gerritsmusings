import React from 'react';
import { Switch, Route, BrowserRouter  } from 'react-router-dom';
import { Start } from './components/Start/Start';
import { Home } from './components/Forms/Home/Home';
import { NavBar } from './components/NavBar/NavBar';
import Blocks from './components/Blocks/Blocks';
import Blog from './components/Blog/Blog';
import Examples from './components/Blog/Examples/Examples';
import './App.css';
import WeatherApp from './components/WeatherApp/WeatherApp';
import { About } from './components/About/About';
import { Photos } from './components/Photos/Photos';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Switch>
          <Route exact path='/' render={() => <Start />} />
          <Route path='/forms' render={() => <Home />} />
          <Route path='/blocks' render={() => <Blocks />} />
          <Route path='/weather' render={() => <WeatherApp />} />
          <Route exact path='/blog' render={() => <Blog />} />
          <Route path='/about' render={() => <About />} />
          <Route path='/photos' render={() => <Photos />} />
          <Route path='/examples' render={() => <Examples />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
