import React from 'react';
import PropTypes from 'prop-types';

const Payables = ({payables, transaction, closeModal}) => (
  <div className="pagaveis">
    <div className="topo">
      Detalhes da transação de pagamento:
      <button className="close" onClick={closeModal}>&times;</button>
    </div>

    <div className="detalhes">
      <h2 className="valor">Total: <strong>{transaction.amount}</strong></h2>

      <div className="lista-pagaveis">
        {
          payables.map((payable, index) =>
            <div key={index} className="lista">
              <p>{ transaction.split_rules.find(split => payable.id === split.recipient_id).percentage }%</p>
              <p>{payable.name}</p>
              <p>{(parseFloat(payable.amount / 100))}</p>
            </div>
          )
        }
      </div>
    </div>
  </div>
)

Payables.propTypes = {
  payables: PropTypes.array.isRequired,
  closeModal: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
}

export default Payables
