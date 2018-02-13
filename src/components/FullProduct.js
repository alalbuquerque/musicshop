import React from 'react';

import Product from './Product';
import ProductDetails from './ProductDetails';

import Button from './Button';


class FullProduct extends React.Component {
  render() {
    const { products, location } = this.props;
    console.log(this.props);
    const product = products.get(this.props.match.params.id);

    if (!products.length && !location) {
        return (<div>Loading...</div>);
    }

    return product ? (
      <div className="full-product">
        <Product key={product.id} product={product}>
          <div className="info">
            <h4>Detalhes:</h4>
            <ol className="details-list">
                {
                  product.details.map((p, key) => (
                      <li key={p.album_id}>
                        <ProductDetails
                          product={p}
                       />
                      </li>
                  ))
                }
            </ol>
          </div>

          <div className="compra">
             <Button onClick={() => this.addCart(product)}>Comprar</Button>
          </div>
        </Product>
      </div>
    ) : (
      <div>Error: Product doesn't exist</div>
    );
  }
}

export default FullProduct
          
