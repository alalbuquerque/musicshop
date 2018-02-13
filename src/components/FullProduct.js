import React from 'react';

import Product from './Product';
import ProductDetails from './ProductDetails';

import Button from './Button';

class FullProduct extends React.Component {
    constructor (props) {
      super(props)

      this.state = {
        product :  this.props.products.get(this.props.match.params.id)
      }
    }

  render() {
    const { product } = this.state;

    return product ? (
      <div className="full-product">
        <Product key={product.name} product={product}>
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
             <Button>Comprar</Button>
          </div>
        </Product>
      </div>
    ) : (
      <div>Error: Product doesn't exist</div>
    );
  }
}

export default FullProduct
