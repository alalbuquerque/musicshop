import React from 'react';
import PropTypes from 'prop-types';

const ProductDetails = ({product}) => (
  <div>
      {product.name} 
  </div>
)

ProductDetails.propTypes = {
  product: PropTypes.object.isRequired
}

export default ProductDetails
