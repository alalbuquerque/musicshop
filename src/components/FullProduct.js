import React from 'react';
import { Link } from 'react-router-dom';

import Product from './Product';
import ProductDetails from './ProductDetails';
import Button from './Button';

class FullProduct extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      product :  this.props.products.get(parseInt(this.props.match.params.id, 10)),
      cart: this.props.cart, 
      index: this.props.match.params.id
    }

  }

  addToCart (product) {
    const { cart } = this.state
    product = {...product}
    
    this.setState({
      cart: {
        products: [...cart.products, product]
      }
    })
    this.props.callbackAddCart(product);
  }

  render() {
    const { product, index } = this.state;

    return product ? (
      <div key={index} className="produto-todo">
        <div className="breadcrumb">
          <p>
            <Link to="/" className="active">Home</Link> / {product.name}
          </p>
        </div>
        <Product product={product}>
          <div className="informacoes">
            <h4>Detalhes do Álbum:</h4>
            <ol className="details-list">
                {
                  product.details.map((p, i) => (
                      <li key={i}>
                        <ProductDetails product={p} />
                      </li>
                  ))
                }
            </ol>
          </div>

          <div className="compra">
            <Button onClick={() => this.addToCart(product)}>Comprar</Button>
          </div>
        </Product>
      </div>
    ) : (
      <div>Erro: Produto não encontrado</div>
    );
  }
}

export default FullProduct
