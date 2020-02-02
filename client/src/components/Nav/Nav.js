import React from 'react'
import classnames from 'classnames'
import styles from './Nav.module.scss'

const Nav = () => {
  const [active, setActive] = React.useState(false)

  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <p className="navbar-item">Coffee Journal</p>

        <button
          className={classnames('navbar-burger burger', styles.transparent, {
            'is-active': active,
          })}
          onClick={() => setActive(!active)}
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </button>
      </div>

      <div
        id="navbarBasicExample"
        className={classnames('navbar-menu', {
          'is-active': active,
        })}
      >
        <div className="navbar-start">
          <button className={classnames('navbar-item', styles.transparent)}>
            Home
          </button>
          <button className={classnames('navbar-item', styles.transparent)}>
            Documentation
          </button>
        </div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              <button className="button is-primary">
                <strong>Sign up</strong>
              </button>
              <button className="button is-light">Log in</button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
