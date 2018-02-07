import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({visible, children}) => (
  <div className={`modal ${visible ? 'is-visible' : ''}`}>
    <div className="modal-content">
      {children}
    </div>
  </div>
)

Modal.propTypes = {
  visible: PropTypes.bool.isRequired,
  children: PropTypes.element.isRequired
}

Modal.defaultProps = {
  visible: false
}

export default Modal
