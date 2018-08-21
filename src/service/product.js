// user service

import { http } from 'util'

export default {
  // 获取商品列表
  async getProductList({ listType, pageNum, searchType, keyword }) {
    let url = '',
        data = {pageNum}
    
    if (listType == 'list') {
      url = '/manage/product/list.do'
    } else if (listType == 'search') {
      url = '/manage/product/search.do'
      data[searchType] = keyword
    }

    console.log(data)

    return await http('POST', url, {data}, '获取商品列表失败')
  },

  // 获取商品详情
  async getProduct(productId) {
    productId = productId || 0
    return await http('POST', '/manage/product/detail.do', {productId}, '获取商品详情失败')
  },
  
  // 变更商品销售状态
  async setProductStatus(productInfo) {
    console.log(productInfo)
    await http('POST', '/manage/product/set_sale_status.do', {data: productInfo}, '变更商品销售状态失败', true)
  },
  
  // 检查保存商品的表单数据
  checkProduct(product) {
    let result = {
      status: true,
      msg: '验证通过'
    }
    // 判断用户名为空
    if (typeof product.name !== 'string' || product.name.length ===0){
      return {
        status: false,
        msg: '商品名称不能为空！'
      }
    }
    // 判断描述不能为空
    if(typeof product.subtitle !== 'string' || product.subtitle.length ===0){
      return {
        status: false,
        msg: '商品描述不能为空！'
      }
    }
    // 验证品类ID
    if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
      return {
        status: false,
        msg: '请选择商品品类！'
      }
    }
    // 判断商品价格为数字，且大于0
    if(typeof product.price !== 'number' || !(product.price >= 0)){
      return {
        status: false,
        msg: '请输入正确的商品价格！'
      }
    }
    // 判断库存为数字，且大于或等于0
    if(typeof product.stock !== 'number' || !(product.stock >= 0)){
      return {
        status: false,
        msg: '请输入正确的库存数量！'
      }
    }
    
    return result
  },

  // 保存商品
  async saveProduct(product) {
    await http('POST', '/manage/product/save.do', {data: product}, '保存商品失败', true)
  },
    
  // 根据父品类id获取品类列表
  async getCategoryList(parentCategoryId) {
    return await http('POST', '/manage/category/get_category.do', {categoryId : parentCategoryId || 0}, '获取品类列表失败')
  },

  // 新增品类
  async saveCategory(category){
    await http('POST', '/manage/category/add_category.do', {data : category}, '新增失败', true)
  },

  // 修改品类名称
  async updateCategoryName(category){
    console.log(category)
    await http('POST', '/manage/category/set_category_name.do', {data : category}, '修改失败', true)
  } 
}