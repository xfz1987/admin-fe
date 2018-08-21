import { http } from 'util'

export default {
  // 获取订单列表
  async getOrderList(listParam) {
    let url = '',
        data = {}

    if (listParam.listType === 'list') {
      url = '/manage/order/list.do'
      data.pageNum  = listParam.pageNum;
    } else if (listParam.listType === 'search'){
      url = '/manage/order/search.do'
      data.pageNum = listParam.pageNum
      data.orderNo = listParam.orderNo
    }
    console.log(data)
    
    return await http('POST', url, {data}, '获取订单列表失败')
  },

  // 获取订单详情
  async getOrderDetail(orderNo) {
    return await http('POST', '/manage/order/detail.do', {orderNo}, '获取详情失败')
  },

  async sendGoods(orderNo){
    await http('POST', '/manage/order/send_goods.do', {orderNo})
  }
}