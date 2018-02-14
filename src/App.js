import React from 'react';
import ProductAPI from './Api';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import FullProduct from './components/FullProduct';
import Checkout from './components/Checkout'; 


class App extends React.Component {  
  constructor (props) {
    super(props)

    this.state = {
      products: [],
      cart: {
        products: []
      }
    }
  }

  getProducts(){
    this.setState({
      products : ProductAPI
    })
  }

  componentWillMount(){
    this.getProducts();
  }

  handleAddToCart(product) {    
    const { cart } = this.state

    this.setState({
      cart: {
        products: [...cart.products, product]
      }
    })
  }

  handleRemoveToProduct (product) {
    const { cart } = this.state

    this.setState({
      cart: {
        ...cart,
        products: cart.products.filter(p => p.id !== product.id)
      }
    })
  }

  checkout (amount) {
    amount = Math.round(amount * 100)

    /*const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: process.env.REACT_APP_ENC_KEY,
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
    })*/
  }

  render () {
    
    const { cart, products, total } = this.state
    
    return ( 
      <Router> 
    	  <div>
          <Header cart={cart} />
    	    <main>
            <Route 
              exact 
              path="/" 
              render={(props) => <ProductList {...props} 
                cart={cart} 
                products={products} 
                callbackParent={(product) => this.handleRemoveToProduct(product)}
              />} 
            />
           <Route 
              path="/produto/:id"  
              render={(props) => <FullProduct {...props} 
                cart={cart} 
                products={products} 
                callbackParent={(product) => this.handleAddToCart(product)}
              />} 
            />
           <Route 
              path="/carrinho"  
              render={(props) => <Cart {...props} 
                cart={cart} 
                products={products}  
                removeToCart={this.removeCart}/>
              } 
            />
           <Route 
              path="/finalizando"  
              render={(props) => <Checkout {...props} 
                cart={cart} 
                callbackParent={(product) => this.handleAddToCart(product)}
              />} 
            />
    	    </main>
    	  </div>
      </Router>
		)
	}
}

export default App
