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
      cart: this.props.cart
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
    this.props.callbackParent(product);
  }

  render() {
    const { product } = this.state;

    return product ? (
      <div className="full-product">

        <div className="breadcrumb">
          <p>
            <Link to="/" className="active">Home</Link>> {product.name}
          </p>
        </div>
        <br />
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
