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


  checkout (amount) {
    amount = (amount/100).toFixed(2)

    var checkout = new window.PagarMeCheckout.Checkout({"encryption_key":"ak_test_H7L68aHLEZNOxGBSJQ6CcQ1pBhEbvt", 
      success: function(data) {
        console.log(data);
      }, error: function(err) {
          console.log(err);
      }
    });
    
    console.log(amount);
    var params = {
      "amount": amount,
      "buttonText":"Pagar", 
      "customer": {
          "address": {
              "neighborhood": "Jardim Paulistano", 
              "street": "Avenida Brigadeiro Faria Lima", 
              "street_number": "1811", 
              "zipcode": "01451001"
          }, 
          "document_number": "18152564000105", 
          "email": "aardvark.silva@pagar.me", 
          "name": "Aardvark Silva", 
          "phone": {
              "ddd": "11", 
              "ddi": "55", 
              "number": "99999999"
          }
      }, 
      "metadata": {
          "idProduto": "13933139"
      }, 
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
                    <Button onClick={(product) => this.removeCart(product)} className="remove">&times;</Button>
                  </Product>
              ))
              }
          </div>

          <div className="total">
              <div className="cart-price">
              <p>
                  Total: <strong>R$ {(total/100).toFixed(2).replace('.', ',')}</strong>
              </p>
              </div>
              <Button className="finalizar" onClick={() => this.checkout(total)} disabled={(total <= 0) && 'disabled'}>Finalizar compra</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Cart
