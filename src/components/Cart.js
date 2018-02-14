import React from 'react';

import Product from './Product';
import Button from './Button';
import FaCart from 'react-icons/lib/md/shopping-cart';

class Cart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      product :  this.props.products.get(parseInt(this.props.match.params.id, 10)),
      cart: this.props.cart, 
    }

  }  


  removeCart (product) {
    const { cart } = this.state

    this.setState({
      cart: {
        ...cart,
        products: cart.products.filter(p => p.id !== product.id)
      }
    })

    this.props.callbackParent(product);
  }

  render() {
    const { product, cart } = this.state;
    const products = cart.products;
    const total = products.map(product => product.price).reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0)
    
    return (
      <div className="cart">
        <div className="header">
          <h3>Carrinho <FaCart /></h3>
        </div>
        <div className="products-container">  
          <h4>{products.length ? `Lista (${products.length})` : 'Seu carrinho está vazio :('}</h4>
          <div className="products">
              {
              products.map(product => (
                  <Product key={product.id} product={product}>
                    <Button onClick={() => this.removeCart(product)} className="remove">&times;</Button>
                  </Product>
              ))
              }
          </div>

          <div className="total">
              <div className="cart-price">
              <p>
                  Total: <strong>R$ {total}</strong>
              </p>
              </div>
              <Button className="finalizar" disabled={(total <= 0) && 'disabled'}>Finalizar compra</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
