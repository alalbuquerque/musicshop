import React from 'react';
import PropTypes from 'prop-types';

import imageAlbum from '../images/album-photo.jpg';

const Product = ({product, children, onClick}) => (
	<div className="produto">
	  	<div className="item" onClick={onClick}>
			<h2 className="titulo">{product.name} - {product.vendor.name}</h2>
			<div className="detalhes-produto">
				<div className="detalhes">
					<img alt={product.name} src={imageAlbum} />
					<strong className="valor">R$ {(product.price/100).toFixed(2).replace('.', ',')}</strong>
				</div>
				<div className="detalhes-album">
					{children}
				</div>  
			</div>  
		</div>  
	</div>
)

Product.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([PropTypes.node]),
  product: PropTypes.object.isRequired
}

export default Product
