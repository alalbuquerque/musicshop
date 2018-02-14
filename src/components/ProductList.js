import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Product from './Product';

const ProductList = ({cart, products}) => (
  <div className="lista-produtos">
    {
      products.all().map((product, index) => (
        <Link key={index} to={{pathname: `produto/${product.id}`, query: { id: product.id }}}>
          <Product key={index} product={product} />
        </ Link>
      )
    )}
  </div>
) 

ProductList.propTypes = {
  cart: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired
}

export default ProductList
