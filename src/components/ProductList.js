import React from 'react';
import ProductAPI from './Api';
import Product from './Product'


class ProductList extends React.Component {
  constructor () {
    super()

    this.state = {
      products: ProductAPI,
    }
  }

  render () {
    const { products } = this.state

    return (  
        <div className="products">
          {
            products.all().map(product => (
                <Product
                  key={product.name}
                  product={product}
                />
            ))
          }
        </div>
		)
	}
}

export default ProductList
