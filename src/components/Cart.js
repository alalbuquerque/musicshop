import React from 'react';
import { Link } from 'react-router-dom';


import CaptureTransaction from '../api'

import Product from './Product';
import Payables from './Payables';

import Button from './Button';
import Modal from './Modal';
import FaCart from 'react-icons/lib/md/shopping-cart';

class Cart extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      product :  this.props.products.get(parseInt(this.props.match.params.id, 10)),
      cart: this.props.cart, 
      payablesModal: {
        payables: [
          {
            legal_name: 'Amanda Leite de Albuquerque',
            percentage: 25,
            bank_code: '341',
            agencia: '7499',
            agencia_dv: '0',
            conta: '13114',
            conta_dv: '7',
            document_number: '13723738702'
          },
          {
            legal_name: 'Gloria Groove - Musicshop',
            percentage: 60,
            bank_code: '341',
            agencia: '6327',
            agencia_dv: '0',
            conta: '14804',
            conta_dv: '2',
            document_number: '13723738702'
          },
          {
            legal_name: 'Pabllo Vittar',
            percentage: 15,
            bank_code: '341',
            agencia: '7499',
            agencia_dv: '0',
            conta: '13114',
            conta_dv: '7',
            document_number: '13723738702'
          }
        ],
        amount: 0,
        fetched: true,
        visible: false
      }
    }


    this.showPayables = this.showPayables.bind(this)
    this.checkoutPurchase = this.checkoutPurchase.bind(this)
    this.closePayablesModal = this.closePayablesModal.bind(this)

  }  


  removeCart (product) {
    const { cart } = this.state

    this.setState({
      cart: {
        ...cart,
        products: cart.products.filter(p => p.id !== product.id)
      }
    })


    this.props.callbackRemoveCart(product);
  }

  showPayables ({payables, transaction}) {
    const { payablesModal } = this.state

    this.setState({
      cart: {
        products: []
      },
      payablesModal: {
        payables,
        transaction,
        fetched: true,
        visible: !payablesModal.visible
      }
    })
  }

  checkoutPurchase (amount) {
    const checkout = new window.PagarMeCheckout.Checkout({
      encryption_key: process.env.REACT_APP_ENC_KEY,
      success: transaction => {
        this.setState({
          payablesModal: { fetched: false }
        })

        CaptureTransaction(transaction, amount)
          .then(this.showPayables)
      }, 
      error: error => {
        console.log(error);
      }
    })

    checkout.open({
      amount,
      buttonText: 'Pagar',
      paymentMethods: 'boleto',
      uiColor: '#444444',
      createToken: 'true',
      headerText: 'Finalizar compra.',
      customer:{
        type: 'individual',
        country: 'br',
        name: 'Daenerys Targaryen',
        documents: [{
            type: 'cpf',
            number: '00000000000'
        }]
    }
    })
  }


  closePayablesModal () {
    const { payablesModal } = this.state

    this.setState({
      payablesModal: {
        ...payablesModal,
        visible: !payablesModal.visible
      }
    })
  }

  render() {
    const { cart, payablesModal } = this.state;
    const products = cart.products;
    const total = products.map((product, index) => product.price).reduce((previousPrice, currentPrice) => previousPrice + currentPrice, 0)
    
    return (
      <div className="carrinho">
        <div className="topo">
          <h3>Carrinho <FaCart /></h3>
        </div>
        <div className="box-produtos">  
          <h4>{products.length ? `Lista (${products.length})` : 'Seu carrinho está vazio :('}</h4>
          <div className="lista-produtos">
              {
              products.map((product, index) => (
                <div key={index} className="item-carrinho">
                  <Link to={{pathname: `produto/${product.id}`, query: { id: product.id }}}>
                    <Product product={product} />
                  </Link>
                  <Button key={product.id} onClick={() => this.removeCart(product)} className="remove">&times;</Button>
                </div>  
              ))
              }
          </div>

          <div className="total">
              <div className="valor-carrinho">
                <p>Total: <strong>R$ {(total/100).toFixed(2).replace('.', ',')}</strong></p>
              </div>
              <Button className="finalizar" onClick={() => this.checkoutPurchase(total)} disabled={(total <= 0) && 'disabled'}>Finalizar compra</Button>
          </div>
        </div>


        {
          !payablesModal.fetched && <div className="loading"> recuperando informações da transação </div>
        }

        {
          payablesModal.visible &&
          <Modal visible={payablesModal.visible}>
            <Payables
              payables={payablesModal.payables}
              closeModal={this.closePayablesModal}
              transaction={payablesModal.transaction}
            />
          </Modal>
        }

      </div>
    )
  }
}

export default Cart
