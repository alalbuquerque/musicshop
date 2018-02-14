import React from 'react';
import PropTypes from 'prop-types';

const Product = ({product, children, onClick}) => (
  <div className="item" onClick={onClick}>
	  	<h2 className="title">{product.name} - {product.vendor.name}</h2>
      	<div className="product-details">
      		<div className="details">
      			<img alt={product.name} src={require("../images/album-photo.jpg")} />
      			<strong className="price">R$ {(product.price/100).toFixed(2).replace('.', ',')}</strong>
      		</div>
	    	<div className="album-details">
		  		{children}
	    	</div>  
	  	</div>  
  </div>
)

Product.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.element]),
  product: PropTypes.object.isRequired
}

export default Product
