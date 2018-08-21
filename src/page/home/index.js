import React from 'react'
import { Link } from 'react-router-dom'
import PageTitle from 'component/page-title/index.jsx'
import statiService from 'service/statistic.js'
import './index.scss'

export default class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      userCount: '-',
      productCount: '-',
      orderCount: '-'
    }
  }

  getAPI(){
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          name: 'xfz',
          sex: 'male',
          age: '18'
        })
      }, 3000)
    })
  }
  
  async getData() {
    
  }

  async componentDidMount() {
    let data = await statiService.getHomeCount()
    this.setState(data)
  }

  render() {
    let { userCount, productCount, orderCount } = this.state
    return (
      <div className="page-wrapper">
        <PageTitle title="首页" />
        <div className="row">
          <div className="col-md-4">
            <Link to="/user" className="color-box brown">
              <p className="count">{userCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>用户总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/product" className="color-box green">
              <p className="count">{productCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>商品总数</span>
              </p>
            </Link>
          </div>
          <div className="col-md-4">
            <Link to="/order" className="color-box blue">
              <p className="count">{orderCount}</p>
              <p className="desc">
                <i className="fa fa-user-o"></i>
                <span>订单总数</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}