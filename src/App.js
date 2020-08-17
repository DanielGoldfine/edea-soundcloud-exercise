import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './styles/global.scss'

import SoundCloudMain from './pages/SoundCloudMain'

function App() {
  return (
    <main>
      <Switch className="App">
        <Route component={SoundCloudMain} exact path="/"/>
      </Switch>
    </main>
  );
}

export default App;