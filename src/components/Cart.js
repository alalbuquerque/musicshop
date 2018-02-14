import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import Button from './Button';
import FaCart from 'react-icons/lib/md/shopping-cart';

const Cart = ({cart, remove}) => {
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
                  <button className="remove">&times;</button>
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

Cart.propTypes = {
  products: PropTypes.array.isRequired,
  remove: PropTypes.func.isRequired
}

Cart.defaultProps = {
  products: []
}

export default Cart