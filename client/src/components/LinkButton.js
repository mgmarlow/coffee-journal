import React from 'react'
import classnames from 'classnames'
import styles from './LinkButton.module.scss'

const LinkButton = ({ className, children, ...other }) => (
  <button
    className={classnames(styles.linkButton, className)}
    type="button"
    {...other}
  >
    {children}
  </button>
)

export default LinkButton
