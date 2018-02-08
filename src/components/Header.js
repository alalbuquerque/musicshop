import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <nav>
      <ul>
        <li><Link to="/"><h1>musicshop</h1></Link></li>
        <li><Link to="/carrinho">Carrinho</Link></li>
      </ul>
    </nav>
  </header>
)

export default Header
