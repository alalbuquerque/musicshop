import React from 'react';
import PropTypes from 'prop-types';

const Product = ({product, children, onClick}) => (
  <div className="item" onClick={onClick}>
      <h2 className="title">{product.name} -  {product.vendor.name}</h2>
      <strong className="price">R$ {product.price}</strong>
      {children}  
  </div>
)

Product.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  product: PropTypes.object.isRequired
}

export default Product
