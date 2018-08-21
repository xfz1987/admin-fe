import { http } from 'util'

export default {
  // 首页数据统计
  async getHomeCount(){
    return await http('GET', '/manage/statistic/base_count.do', {}, '获取数据统计失败')
  }
}