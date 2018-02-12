import React from 'react';
import PropTypes from 'prop-types';
import Product from './Product';
import ProductDetails from './ProductDetails';

import Button from './Button';
import Modal from './Modal';

const ProductList = ({cart, products, modalProduct}) => (
    <div className="product-list">
        <div className="list">
          {
            products.all().map(product => (
                <Product
                  key={product.id}
                  product={product}
                  onClick={() => this.modal(product)}
                />
            ))
          }
        </div>
          {modalProduct.visible &&
            <Modal visible={modalProduct.visible}>
              <Product key={modalProduct.id} product={modalProduct.product}>
                <button className="close" onClick={this.closeModal}>&times;</button>
                <div className="info">
                  <h4>Detalhes:</h4>
                  <ol className="details-list">
                      {
                        modalProduct.product.details.map((p, key) => (
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
                   <Button onClick={() => this.addCart(modalProduct.product)}>Comprar</Button>
                </div>
              </Product>
            </Modal>
          }
  </div>
) 

ProductList.propTypes = {
  cart: PropTypes.object.isRequired,
  products: PropTypes.object.isRequired,
  modalProduct: PropTypes.object.isRequired
}


export default ProductList
