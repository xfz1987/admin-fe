import React from 'react'

import productService from 'service/product.js'
import PageTitle from 'component/page-title/index.jsx'
import CategorySelector from './category-selector.js'
import FileUploader from 'component/file-uploader/index.jsx'
import RichEditor from 'component/rich-editor/index.jsx'
import { errorTips } from 'util' 

import './save.scss'

export default class ProductSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id                  : this.props.match.params.pid,
        name                : '',
        subtitle            : '',
        categoryId          : 0,
        parentCategoryId    : 0,
        subImages           : [],
        price               : '',
        stock               : '',
        detail              : '',
        status              : 1 //商品状态1为在售
    }
  }

  componentDidMount() {
    this.loadProduct()
  }

  async loadProduct() {
    // 有id的时候，表示是编辑功能，需要表单回填
    if(this.state.id){
      try {
        let data = await productService.getProduct(this.state.id)
        
        data.subImages = data.subImages.split(',').map(imgUri => {
          return { uri: imgUri, url: data.imageHost + imgUri }
        })        
        
        data.defaultDetail = data.detail
        
        this.setState(data);
      } catch (err) {
        console.log(err)
      }
    }
  }

  // 简单字段的改变，比如商品名称，描述，价格，库存
  onValueChange(e) {
    let name = e.target.name,
        value = e.target.value.trim();
    
    this.setState({
      [name] : value
    })
  }

  // 品类选择器变化
  onCategoryChange(categoryId, parentCategoryId){
    this.setState({
      categoryId,
      parentCategoryId
    })
  }

  // 上传图片成功
  onUploadSuccess(res){
    let subImages = this.state.subImages;
    subImages.push(res);
    
    this.setState({ subImages })
  }
  
  // 上传图片失败
  onUploadError(errMsg){
    errorTips(errMsg);
  }

  // 删除图片
  onImageDelete(e){
    let index = parseInt(e.target.getAttribute('index')),
        subImages   = this.state.subImages

    subImages.splice(index, 1)
    
    this.setState({ subImages })
  }

  // 富文本编辑器的变化
  onDetailValueChange(value){
    this.setState({
      detail: value
    })
  }

  getSubImagesString(){
    return this.state.subImages.map(image => image.uri).join(',')
  }

  // 提交表单
  async onSubmit(){
    let { id, name, subtitle, categoryId, detail, price, stock, status } = this.state

    let product = {
      name,
      subtitle,
      categoryId: parseInt(categoryId),
      subImages: this.getSubImagesString(),
      detail,
      price: parseFloat(this.state.price),
      stock: parseInt(this.state.stock),
      status
    }
    
    // 编辑，否则为添加
    if(id) product.id = id

    let productCheckResult = productService.checkProduct(product)

    // 表单验证成功
    if(productCheckResult.status) {
      try {
        await productService.saveProduct(product)
        this.props.history.push('/product/index')
      } catch(err) {
        console.log(err)
      }
    } else {
      errorTips(productCheckResult.msg)
    }
  }

  render() {
    let { id, name, subtitle, categoryId, parentCategoryId, price, stock, subImages, detail, defaultDetail } = this.state

    return (
      <div className="page-wrapper">
        <PageTitle title={id ? '编辑商品' : '添加商品'} />
        <div className="form-horizontal">
          <div className="form-group">
            <label className="col-md-2 control-label">商品名称</label>
            <div className="col-md-5">
                <input type="text" className="form-control" 
                  placeholder="请输入商品名称"
                  name="name"
                  value={name}
                  onChange={e => this.onValueChange(e)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品描述</label>
            <div className="col-md-5">
                <input type="text" className="form-control" 
                  placeholder="请输入商品名称"
                  name="subtitle"
                  value={subtitle}
                  onChange={e => this.onValueChange(e)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">所属分类</label>
            <CategorySelector 
              categoryId={categoryId}
              parentCategoryId={parentCategoryId}
              onCategoryChange={(categoryId, parentCategoryId) => this.onCategoryChange(categoryId, parentCategoryId)}/>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品价格</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" 
                  placeholder="价格" 
                  name="price"
                  value={price}
                  onChange={e => this.onValueChange(e)}/>
                <span className="input-group-addon">元</span>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品库存</label>
            <div className="col-md-3">
              <div className="input-group">
                <input type="number" className="form-control" 
                  placeholder="库存" 
                  name="stock"
                  value={stock}
                  onChange={e => this.onValueChange(e)}/>
                <span className="input-group-addon">件</span>
              </div>              
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品图片</label>
            <div className="col-md-10">
              {
                subImages.length ? subImages.map((image, index) => (
                  <div className="img-con" key={index}>
                    <img className="img" src={image.url} />
                    <i className="fa fa-close" index={index} onClick={(e) => this.onImageDelete(e)}></i>
                  </div>
                )) : (<div style={{marginTop: '7px'}}>请上传图片</div>)
              }
            </div>
            <div className="col-md-offset-2 col-md-10 file-upload-con">
              <FileUploader 
                onSuccess={res => this.onUploadSuccess(res)}
                onError={errMsg => this.onUploadError(errMsg)}/>
            </div>
          </div>
          <div className="form-group">
            <label className="col-md-2 control-label">商品详情</label>
            <div className="col-md-10">
              <RichEditor 
                detail={detail}
                defaultDetail={defaultDetail}
                onValueChange={v => this.onDetailValueChange(v)}/>
            </div>
          </div>
          <div className="form-group">
            <div className="col-md-offset-2 col-md-10">
              <button type="submit" className="btn btn-primary" 
                onClick={e => this.onSubmit(e)}>提交</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}