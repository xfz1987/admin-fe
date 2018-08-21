// user service

import { http } from 'util'

export default {
  // 用户登录
  async login(loginInfo) {
    let data = await http('POST', '/manage/user/login.do', loginInfo, '用户名或密码错误')
    return data
  },

  // 检查登录接口的数据是不是合法
  checkLogin(loginInfo) {
    let { username, password } = loginInfo
    
    if (!username.length) {
      return {
        status: false,
        msg: '用户名不能为空！'
      }
    }
    
    if (!password) {
      return {
        status: false,
        msg: '密码不能为空！'
      }
    }
    
    return {
      status : true,
      msg : '验证通过'
    }
  },
    
  // 退出登录
  async logout(){
    await http('POST', '/user/logout.do', {}, '退出登陆失败')
  },

  async getUserList(pageNum) {
    return await http('POST', '/manage/user/list.do', {pageNum}, '退出登陆失败')
  }
}