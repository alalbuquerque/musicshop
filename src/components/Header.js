import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

//icons
import FaCart from 'react-icons/lib/md/shopping-cart';
import FaMusic from 'react-icons/lib/fa/music';

const Header = ({cart}) => (
	<div>	
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">
                <h1><FaMusic /> music<span>shop</span></h1>
              </Link>
            </li>
            <li className="carrinho">
              <Link to="/carrinho">
                carrinho 
                <span className="icon">
                  <FaCart /> 
                  <span className={"badge " + (cart.products.length ? 'active' : '')} >{cart.products.length ? `${cart.products.length}` : ''}</span>
                </span>
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
)

Header.propTypes = {
  cart: PropTypes.object.isRequired
}

export default Header
