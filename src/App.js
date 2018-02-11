import React from 'react';
import ProductAPI from './Api';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import ProductList from './components/ProductList'; 
import Cart from './components/Cart';
import Checkout from './components/Checkout';

//styles
import FaCart from 'react-icons/lib/md/shopping-cart';
import FaMusic from 'react-icons/lib/fa/music';

const route = [
  { 
    path: '/',
    component: ProductList,
    fetchInitialData: (id) => ProductAPI(id)
  },
  {
    path: '/',
    component: Cart,
    fetchInitialData: (id) => ProductAPI(id)
  }
];


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

    const { cart, products, modalProduct } = this.state
    return (  
	  <div>
      <header>
        <nav>
          <ul>
            <li><Link to="/"><h1><FaMusic /> music<span>shop</span></h1></Link></li>
            <li className="carrinho"><Link to="/carrinho">carrinho <span><FaCart /></span></Link></li>
          </ul>
        </nav>
      </header>
	    <main>
      	<Route exact path="/" component={ProductList}/>
      	<Route exact path="/carrinho"  component={Cart}/>
      	<Route exact path="/finalizado" component={Checkout}/>
	    </main>
	  </div>

		)
	}
}

export default App
