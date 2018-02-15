import React from 'react';
import { Link } from 'react-router-dom';

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

    this.props.callbackRemoveCart(product);
  }


  checkout (amount) {
    var checkout = new window.PagarMeCheckout.Checkout({"encryption_key":"ek_test_cSHiLy4gg23jlxgRUMOAZb6UeUOfJb", 
      success: function(data) {
        console.log(data);
      }, error: function(err) {
          console.log(err);
      }
    });

    var params = {
      "amount": amount,
      "buttonText":"Pagar", 
      "payment_method": "boleto", 
      "postback_url": "http://requestb.in/pkt7pgpk",
      "split_rules": [
        {
          "recipient_id": 're_civb4p9l7004xbm6dhsetkpj8',
          "percentage": 50,
          "liable": true,
          "charge_processing_fee": true
        },
        {
          "recipient_id": 're_civb4o6zr003u3m6e8dezzja6',
          "percentage": 50,
          "liable": false,
          "charge_processing_fee": true
        }
      ]
    };

    checkout.open(params);

  }

  render() {
    const { cart } = this.state;
    const products = cart.products;
    const total = products.map((product, index) => product.price).reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0)
    
    return (
      <div className="carrinho">
        <div className="topo">
          <h3>Carrinho <FaCart /></h3>
        </div>
        <div className="box-produtos">  
          <h4>{products.length ? `Lista (${products.length})` : 'Seu carrinho está vazio :('}</h4>
          <div className="lista-produtos">
              {
              products.map((product, index) => (
                <div className="item-carrinho">
                  <Link key={index} to={{pathname: `produto/${product.id}`, query: { id: product.id }}}>
                    <Product key={index} product={product} />
                  </Link>
                  <Button key={product.id} onClick={() => this.removeCart(product)} className="remove">&times;</Button>
                </div>  
              ))
              }
          </div>

          <div className="total">
              <div className="valor-carrinho">
                <p>Total: <strong>R$ {(total/100).toFixed(2).replace('.', ',')}</strong></p>
              </div>
              <Button className="finalizar" onClick={() => this.checkout(total)} disabled={(total <= 0) && 'disabled'}>Finalizar compra</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
