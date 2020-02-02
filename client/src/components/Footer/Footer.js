import React from 'react'
import bulmaLogo from './made-with-bulma.png'

const Footer = () => (
  <footer className="footer">
    <p className="content">Coffee journal</p>
    <a href="https://bulma.io">
      <img src={bulmaLogo} alt="Made with Bulma" width="128" height="24" />
    </a>
  </footer>
)

export default Footer
