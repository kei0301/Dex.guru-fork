import { ThemeProvider } from 'styled-components'
import { dark } from '@pancakeswap-libs/uikit'
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header'
import Metroverse from './pages/Metroverse';
import Project from './pages/Project';
import Track from './pages/Track';
import ADS from './pages/Ads';
import Trade from './pages/Trade'
import './App.css';

function App() {
  return (
    <>
      <ThemeProvider theme={dark}>
        <Router>
          <Header />
          <Switch>
            <Route exact path="/" component={Metroverse} />
            <Route path="/track" component={Track} />
            <Route path="/trending" component={Project} />
            <Route path="/ads" component={ADS} />
            <Route path="/trade" component={Trade} />
          </Switch>
        </Router>
      </ThemeProvider>
    </>
  );
}

export default App;