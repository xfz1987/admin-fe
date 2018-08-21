
import React from 'react'
import { Link } from 'react-router-dom'
import { getStorage, removeStorage } from 'util'
import user from 'service/user'

class NavTop extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      username: getStorage('userInfo').username || ''
    }
  }
  
  async onLogout(){
    try {
      await user.logout()
      removeStorage('userInfo')
      window.location.replace('/login')
    } catch (err) {
      console.error(err)
    }
  }
  render(){
    return (
      <div className="navbar navbar-default top-navbar">
        <div className="navbar-header">
          <Link className="navbar-brand" to="/"><b>HAPPY</b>MMALL</Link>
        </div>
        <ul className="nav navbar-top-links navbar-right">
          <li className="dropdown">
            <a className="dropdown-toggle" href="javascript:;">
              <i className="fa fa-user fa-fw"></i>
              {
                this.state.username
                ? <span>欢迎，{this.state.username}</span>
                : <span>欢迎您</span>
              }
              <i className="fa fa-caret-down"></i>
            </a>
            <ul className="dropdown-menu dropdown-user">
              <li>
                <a onClick={() => this.onLogout()}>
                  <i className="fa fa-sign-out fa-fw"></i>
                  <span>退出登录</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    )
  }
}

export default NavTop;