import React from 'react';
import App from './App';
import ProductAPI from './Api';
import Product from './Product';
import ProductDetails from './ProductDetails';
import Button from './Button';
import Modal from './Modal';


class ProductList extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      products: ProductAPI,
      
      modalProduct: {
        product: {},
        visible: false
      },

      cart: {
        products: [],
        visible: false
      }
    }

    this.modal = this.modal.bind(this)
    this.addCart = this.addCart.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.toggle = this.toggle.bind(this)
    this.removeCart = this.removeCart.bind(this)
  }

  modal (product) {
    const { modalProduct } = this.state

    this.setState({
      modalProduct: {
        product,
        visible: !modalProduct.visible
      }
    })
  }

  closeModal () {
    const { modalProduct } = this.state

    this.setState({
      modalProduct: {
        ...modalProduct,
        visible: false
      }
    })
  }

  //cart
  addCart (product) {
    const { cart, modalProduct } = this.state
    product = {...product}

    this.setState({
      cart: {
        products: [...cart.products, product]
      },
      modalProduct: {
        ...modalProduct,
        visible: false
      }
    })
  }
  
  removeCart (productId) {
      const { cart } = this.state

      this.setState({
        cart: {
          ...cart,
          products: cart.products.filter(product => product.id !== productId)
        }
      })
  }

  toggle () {
    const { cart } = this.state

    this.setState({
      cart: {
        ...cart,
        visible: !cart.visible
      }
    })
  }

  render () {
    const { cart, products, modalProduct } = this.state
    return (  
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
		                <h4>Detalhes do Album</h4>
		                <ul className="details">
		                    {
		                      modalProduct.product.details.map(p => (
		                          <li key={p.name}>
		                            <ProductDetails
			                            product={p}
			                         />
		                          </li>
		                      ))
		                    }
		                </ul>
		              </div>
		            <div className="compra">
		               <Button onClick={() => this.addCart(modalProduct.product)}>Comprar</Button>
		            </div>
		            </Product>
		          </Modal>
		        }
			</div>
		)
	}
}

export default ProductList
