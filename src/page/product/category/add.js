import React from 'react'
import productService from 'service/product.js'
import PageTitle from 'component/page-title/index.jsx'
import { errorTips } from 'util'

export default class CategoryAdd extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        categoryList    : [],
        parentId        : 0,
        categoryName    : ''
    }
  }

  componentDidMount(){
    this.loadCategoryList();
  }

  // 加载品类列表,显示父品类列表
  async loadCategoryList(){
    let categoryList = await productService.getCategoryList()
    this.setState({ categoryList })
  }

  // 表单的值发生变化
  onValueChange(e){
    let name = e.target.name,
        value = e.target.value

    this.setState({
      [name]: value
    })
  }
  
  // 提交
  async onSubmit(e){
    let categoryName = this.state.categoryName.trim();
    
    // 品类名称不为空，提交数据
    if(categoryName){
      await productService.saveCategory({
        parentId: this.state.parentId,
        categoryName: categoryName
      })

      this.props.history.push('/product-category/index')
    } else {
      errorTips('请输入品类名称')
    }
      
  }

  render(){
    return (
      <div className="page-wrapper">
        <PageTitle title="品类列表"/>
        <div className="row">
          <div className="col-md-12">
            <div className="form-horizontal">
              <div className="form-group">
                <label className="col-md-2 control-label">所属品类</label>
                <div className="col-md-5">
                    <select name="parentId" 
                      className="form-control"
                      onChange={(e) => this.onValueChange(e)}>
                      <option value="0">根品类/</option>
                      {
                        this.state.categoryList.map((category, index) => {
                          return <option value={category.id} key={index}>根品类/{category.name}</option>
                        })
                      }
                    </select>
                </div>
              </div>
              <div className="form-group">
                <label className="col-md-2 control-label">品类名称</label>
                <div className="col-md-5">
                  <input type="text" className="form-control" 
                    placeholder="请输入品类名称"
                    name="categoryName"
                    value={this.state.name}
                    onChange={(e) => this.onValueChange(e)}/>
                </div>
              </div>
              <div className="form-group">
                <div className="col-md-offset-2 col-md-10">
                  <button type="submit" className="btn btn-primary" 
                    onClick={(e) => {this.onSubmit(e)}}>提交</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}