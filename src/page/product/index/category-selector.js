import React from 'react'
import productService from 'service/product.js'

import './category-selector.scss'

export default class CategorySelector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstCategoryList   : [],
      firstCategoryId     : 0,
      secondCategoryList  : [],
      secondCategoryId    : 0
    }
  }

  componentDidMount() {
    this.loadFirstCategory()
  }

  componentWillReceiveProps({ categoryId, parentCategoryId }) {
    let categoryIdChange = this.props.categoryId !== categoryId,
        parentCategoryIdChange  = this.props.parentCategoryId !== parentCategoryId

    // 数据没有发生变化的时候，直接不做处理
    if (!categoryIdChange && !parentCategoryIdChange) return false
    
    if (parentCategoryId === 0) {
      // 假如只有一级品类
      this.setState({
        firstCategoryId: categoryId,
        secondCategoryId: 0
      })
    } else {
      // 有两级品类
      this.setState({
        firstCategoryId: parentCategoryId,
        secondCategoryId: categoryId
      }, () => {
        parentCategoryIdChange && this.loadSecondCategory();
      })
    }
  }
  
  // 加载一级分类
  async loadFirstCategory() {
    let data = await productService.getCategoryList()
    
    this.setState({
      firstCategoryList: data
    })
  }

  // 加载二级分类
  async loadSecondCategory(){
    let data = await productService.getCategoryList(this.state.firstCategoryId)

    this.setState({
      secondCategoryList: data
    })
  }
  
  // 选择一级品类
  onFirstCategoryChange(e){
    if(this.props.readOnly) return false
    
    this.setState({
      firstCategoryId: e.target.value || 0,
      secondCategoryId: 0,
      secondCategoryList: []
    }, () => {
      // 更新二级品类
      this.loadSecondCategory()
      this.onPropsCategoryChange()
    })
  }
    
  // 选择二级品类
  onSecondCategoryChange(e){
    if(this.props.readOnly) return false
    
    this.setState({
      secondCategoryId: e.target.value || 0
    }, () => {
      this.onPropsCategoryChange()
    });
  }

  // 传给父组件选中的结果
  onPropsCategoryChange(){
    // 判断props里的回调函数存在
    let categoryChangable = typeof this.props.onCategoryChange === 'function'
    
    // 如果是有二级品类
    if(this.state.secondCategoryId){
      categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId, this.state.firstCategoryId)
    }
    // 如果只有一级品类
    else{
      categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId, 0)
    }
  }

  render(){
    return (
      <div className="col-md-10">
        <select
          className="form-control cate-select"
          value={this.state.firstCategoryId}
          onChange={e => this.onFirstCategoryChange(e)}
          readOnly={this.props.readOnly}>
          <option value="">请选择一级分类</option>
          {
            this.state.firstCategoryList.map((category, index)=> (
              <option value={category.id} key={index}>{category.name}</option>
            ))
          }
        </select>
        {this.state.secondCategoryList.length ?
          <select 
            className="form-control cate-select"
            value={this.state.secondCategoryId}
            onChange={e => this.onSecondCategoryChange(e)}
            readOnly={this.props.readOnly}>
            <option value="">请选择二级分类</option>
            {
              this.state.secondCategoryList.map((category, index)=> (
                <option value={category.id} key={index}>{category.name}</option>
              ))
            }
          </select> : null
        }
      </div>
    )
  }
}