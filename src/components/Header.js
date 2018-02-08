import React from 'react';
import { Link } from 'react-router-dom';
import FaCart from 'react-icons/lib/md/shopping-cart';
import FaMusic from 'react-icons/lib/fa/music';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/"><h1><FaMusic /> music<span>shop</span></h1></Link></li>
        <li className="carrinho"><Link to="/carrinho">carrinho <span><FaCart /></span></Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
