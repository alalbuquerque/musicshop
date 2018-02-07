import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Product from './Product'; 
import Cart from './Cart';
import Checkout from './Checkout';

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Product}/>
      <Route path='/Cart' component={Cart}/>
      <Route path='/Checkout' component={Checkout}/>
    </Switch>
  </main>
)

export default Main
