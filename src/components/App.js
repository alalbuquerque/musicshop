import React from 'react';
import ProductAPI from './Api';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import ProductList from './ProductList'; 
import Cart from './Cart';
import Checkout from './Checkout';
import './styles/App.scss';


class App extends React.Component {  constructor () {
    super()

    this.state = {
      products: ProductAPI,
      
      modalProduct: {
        product: {},
        visible: false
      },

      cart: {
        products: [],
        visible: false
      }
    }

    this.modal = this.modal.bind(this)
    this.addCart = this.addCart.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.toggle = this.toggle.bind(this)
    this.removeCart = this.removeCart.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({cart: ' '});
  }

  //modal
  modal (product) {
    const { modalProduct } = this.state

    this.setState({
      modalProduct: {
        product,
        visible: !modalProduct.visible
      }
    })
  }

  closeModal () {
    const { modalProduct } = this.state

    this.setState({
      modalProduct: {
        ...modalProduct,
        visible: false
      }
    })
  }

  //cart
  addCart (product) {
    const { cart, modalProduct } = this.state
    product = {...product}

    this.setState({
      cart: {
        products: [...cart.products, product]
      },
      modalProduct: {
        ...modalProduct,
        visible: false
      }
    })
  }
  
  removeCart (productId) {
      const { cart } = this.state

      this.setState({
        cart: {
          ...cart,
          products: cart.products.filter(product => product.id !== productId)
        }
      })
  }

  toggle () {
    const { cart } = this.state

    this.setState({
      cart: {
        ...cart,
        visible: !cart.visible
      }
    })
  }

  render () {

    const { cart, products, modalProduct } = this.state
    return (  
	  <div>
	    <Header />
	    <main>
		    <Switch>
		      	<Route exact path="/" component={ProductList}/>
	        	<Route exact path="/carrinho"  component={Cart}/>
	        	<Route exact path="/finalizado" component={Checkout}/>
		    </Switch>
	    </main>
	  </div>

		)
	}
}

export default App
