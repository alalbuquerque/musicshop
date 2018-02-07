import React from 'react';
import { Switch, Route } from 'react-router-dom';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={}/>
      <Route path='/Product' component={}/>
      <Route path='/Cart' component={}/>
    </Switch>
  </main>
)

export default Main
