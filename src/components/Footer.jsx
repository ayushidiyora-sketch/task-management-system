import React from 'react';
import '../styles/login.css';

function Footer() {
  return (
    <footer className="app-footer">
      © {new Date().getFullYear()} TaskFlow. All rights reserved.
    </footer>
  );
}

export default Footer;
