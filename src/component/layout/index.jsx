import React from 'react'
import NavTop from 'component/nav-top/index.jsx'
import NavSide from 'component/nav-side/index.jsx'

import './index.scss';

export default class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="wrapper">
        <NavTop />
        <NavSide />
        {this.props.children}
      </div>
    )
  }
}