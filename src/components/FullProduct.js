import React from 'react';

import Product from './Product';
import ProductDetails from './ProductDetails';

import Button from './Button';

class FullProduct extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      product :  this.props.products.get(this.props.match.params.id),
      cart: {}
    }
  }

  addToCart (product) {
    const { cart } = this.state
    product = {...product}
    console.log(product);
    console.log(cart);  

    this.setState({
      cart: {
        products: [...cart.products, product]
      }
    }, function(){
        this.props.addToCart(product);
    })
  }

  render() {
    const { product } = this.state;

    return product ? (
      <div className="full-product">
        <Product key={product.id+product.sku} product={product}>
          <div className="info">
            <h4>Detalhes:</h4>
            <ol className="details-list">
                {
                  product.details.map((p, key) => (
                      <li key={p.album_id}>
                        <ProductDetails product={p} />
                      </li>
                  ))
                }
            </ol>
          </div>

          <div className="compra">
             <Button onClick={this.addToCart.bind(product)}>Comprar</Button>
          </div>
        </Product>
      </div>
    ) : (
      <div>Erro: Produto não encontrado</div>
    );
  }
}

export default FullProduct
