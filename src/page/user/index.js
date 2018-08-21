import React from 'react'
import { Link } from 'react-router-dom'
import userService from 'service/user.js'

import PageTitle from 'component/page-title/index.jsx'
import TableList from 'component/table-list/index.jsx'
import Pagination from 'component/pagination/index.jsx'

export default class UserList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      list: [],
      pageNum: 1
    }
  }

  componentDidMount(){
    this.loadUserList()
  }

  async loadUserList() {
    try {
      let data = await userService.getUserList(this.state.pageNum)
      this.setState(data)
    } catch (err) {
      this.setState({ list: [] })
    }
  }

  onPageNumChange(pageNum){
    this.setState({
      pageNum : pageNum
    }, () => {
      this.loadUserList();
    })
  }

  render() {
    let { list, pageNum } = this.state

    let listBody = list.map(user => {
      return (
        <tr key={user.id}>
          <td>{user.id}</td>
          <td>{user.username}</td>
          <td>{user.email}</td>
          <td>{user.phone}</td>
          <td>{new Date(user.createTime).toLocaleString()}</td>
        </tr>
      )
    })

    return (
      <div className="page-wrapper">
        <PageTitle title="用户列表"/>
        <TableList tableHeads={['ID', '用户名', '邮箱', '电话', '注册时间']}>
          {listBody}
        </TableList>
        <Pagination current={pageNum} 
          total={this.state.total} 
          onChange={pageNum => this.onPageNumChange(pageNum)}
        />
      </div>
    )
  }
}