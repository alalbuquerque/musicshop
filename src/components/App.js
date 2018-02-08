import React from 'react';
import Header from './Header';
import Main from './Main';
import ProductAPI from './Api';
import './styles/App.scss';


class App extends React.Component {
  render () {
    return (  
	  <div>
	    <Header />
	    <Main />
	  </div>

		)
	}
}

export default App
