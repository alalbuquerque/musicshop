import React from 'react';
import ProductAPI from './Api';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from './components/Header';
import Cart from './components/Cart';
import ProductList from './components/ProductList';
import FullProduct from './components/FullProduct';
import Checkout from './components/Checkout'; 


class App extends React.Component {  
  constructor () {
    super()

    this.state = {
      products: [],
      cart: {
        products: []
      },
      totalItems: 0,
      totalAmount: 0, 
    }


    this.handleAddToCart = this.handleAddToCart.bind(this);
    this.sumTotalItems = this.sumTotalItems.bind(this);
    this.sumTotalAmount = this.sumTotalAmount.bind(this);
    this.checkProduct = this.checkProduct.bind(this);
  }

  getProducts(){
    this.setState({
      products : ProductAPI
    })
  }

  componentWillMount(){
    this.getProducts();
  }


  checkProduct(productID){
    let cart = this.state.cart;
    return cart.some(function(item) {
      return item.id === productID;
    }); 
  }

  handleAddToCart (product) {
    let { cart } = this.state
    product = {...product}

    this.setState({
      cart: {
        products: [...cart.products, product]
      }
    })
    
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
  }

  sumTotalItems () {
    let total = 0;
    let cart = this.state.cart;

    total = cart.length;
    this.setState({
      totalItems: total
    })
  }

  sumTotalAmount () {
    let total = 0;
    let cart = this.state.cart;

    for (var i=0; i<cart.length; i++) {
        total += cart[i].price * parseInt(cart[i].quantity);
    }

    this.setState({
      totalAmount: total
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

  handleRemoveProduct(id, e){
    let cart = this.state.cart;
    let index = cart.findIndex((x => x.id == id));
    cart.splice(index, 1);
    this.setState({
      cart: cart
    })
    this.sumTotalItems(this.state.cart);
    this.sumTotalAmount(this.state.cart);
    e.preventDefault();
  }

  checkout (amount) {
    amount = Math.round(amount * 100)

    const checkout = new window.PagarMeCheckout.Checkout({
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
    })
  }

  render () {
    
    const { cart, products } = this.state
    
    return ( 
      <Router> 
    	  <div>
          <Header cart={cart} />
    	    <main>
            <Route 
              exact 
              path="/" 
              render={(props) => <ProductList {...props} cart={cart} products={products} />} 
            />
           <Route 
              path="/produto/:id"  
              render={(props) => <FullProduct {...props} products={products} addToCart={this.handleAddToCart}  />} 
            />
           <Route 
              path="/carrinho"  
              render={(props) => <Cart {...props} cart={cart}  removeToCart={this.removeCart}/>} 
            />
           <Route 
              path="/finalizando"  
              render={(props) => <Checkout {...props} cart={cart} />} 
            />
    	    </main>
    	  </div>
      </Router>
		)
	}
}

export default App
