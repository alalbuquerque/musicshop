import React from 'react';
import ProductAPI from './Api';
import { Switch, Route } from 'react-router-dom';
import ProductList from './ProductList'; 

class Main extends React.Component {
  render () {
    return (  
	  <main>
	    <Switch>
	      <Route exact path="/" component={ProductList}/>
	    </Switch>
	  </main>
		)
	}
}

export default Main
