import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/product'>Products</Link></li>
        <li><Link to='/cart'>Carrinho</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
