// frontend/src/components/Header.jsx

import React from 'react';
import Navbar from './Navbar';

export default function Header({ onCartClick }) {
  return <Navbar onCartClick={onCartClick} />;
}
