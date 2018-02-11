import React from 'react';
import ProductAPI from './Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


import Header from './components/Header';
//import ProductList from './components/ProductList'; 
import Cart from './components/Cart';
import Checkout from './components/Checkout';

class App extends React.Component {  
  constructor () {
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

  checkout (amount) {
    amount = Math.round(amount * 100)

    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: 'chave',
      success: transaction => {
        console.log(transaction);
      }
    })

    checkout.open({
      amount,
      buttonText: 'Pagar',
      customerData: 'true',
      paymentMethods: 'credit_card',
      maxInstallments: 12,
      uiColor: '#444444',
      createToken: 'true',
      interestRate: 12,
      freeInstallments: 12,
      defaultInstallment: 5,
      headerText: 'Finalizar compra.'
    })
  }

  render () {
    const routes = [
      { 
        path: '/',
        component: ProductList,
        fetchInitialData: this.state
      },
      {
        path: '/',
        component: Cart,
        fetchInitialData: this.state
      }
    ];
    //const { cart, products, modalProduct } = this.state
    return ( 
      <Router> 
    	  <div>
          <Header />
    	    <main>
            {routes.map(({ path, component: C, fetchInitialData}) => (
              <Route 
                path={path}
                render={(props) => <C {...props} fetchInitialData={fetchInitialData} />}
              />
              ))}
    	    </main>
    	  </div>
      </Router>
		)
	}
}

export default App
