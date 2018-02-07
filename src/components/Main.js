import React from 'react';
import ProductAPI from './Api';
import { Switch, Route } from 'react-router-dom';
import Product from './Product'; 

class Main extends React.Component {
  constructor () {
    super()

    this.state = {
      products: ProductAPI,
    }
  }

  render () {
    const { products } = this.state

    return (  
	  <main>
	    <Switch>
	      <Route exact path="/" component={Product}/>
	    </Switch>
	  </main>
		)
	}
}

export default Main
