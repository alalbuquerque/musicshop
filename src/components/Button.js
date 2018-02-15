import React from 'react';
import PropTypes from 'prop-types';

const Button = (props) => (
  <button className="button" {...props}>
    {props.children}
  </button>
)

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node
  ])
}

Button.defaultProps = {
  children: 'default button'
}

export default Button
