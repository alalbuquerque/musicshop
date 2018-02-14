import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = ({product}) => (
  <div key={product.name}>
      {product.name} 
  </div>
)

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductDetails
