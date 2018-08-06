import React from 'react'
import ReactDOM from 'react-dom'

// 基础组件写法
function Component({ name }){
  return <h1>I am { name }</h1>
}

// ES6写法
class ES6Component extends React.Component {
  _bind(...methods){
    methods.forEach(method => this[method] = this[method].bind(this))
  }
  constructor(props){
    super(props)
    this.state = {
      name: 'zc',
      age: 18
    }
    // this.add = this.add.bind(this)
    this._bind('add', 'stuc')
  }
  add(){
    this.setState({
      age: this.state.age + 1
    })
  }
  stuc(){
    this.setState({
      age: this.state.age - 1
    })
  }
  valChange(e){
    this.setState({
      age: e.target.value
    })
  }
  render(){
    return (
      <div>
        <p>I am {this.state.name}</p>
        <p>I am {this.state.age} years old</p>
        <button onClick={this.add}>加</button>
        <button onClick={this.stuc}>减</button>
        <input type="text" onChange={e => this.valChange(e)}/>
      </div>
    )
  }
}

function TestComp(props){
    let refDom;
    return (<div>
        <div ref={(node) => refDom = node}>
            ...
        </div>
    </div>)
}

class Title extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return <div>{this.props.children}</div>
  }
}


class App extends React.Component {
  render(){
    return (
      <div>
        <h1>容器组件 类似vue中的 slot 内容分发</h1>
        <Title>
          <span>App Span</span>
          <a style={{marginLeft:'20px'}}>link</a>
        </Title>
        <h1>单纯组件</h1>
        <Component name="sb"/>
      </div>
    )
  }
}

// 数据传递和状态提升
class Child1 extends React.Component {
  constructor(props){
    super(props)
  }
  handleClick(){
    this.props.changeChild2Color('red')
  }
  render(){
    return (
      <div>
        <h1>Child1: {this.props.bgColor}</h1>
        <button onClick={() => this.handleClick()}>改变 child2 颜色</button>
      </div>
    )
  }
}

class Child2 extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return (
      <div style={{background: this.props.bgColor}}>
        <h1>Child2背景颜色: {this.props.bgColor}</h1>
      </div>
    )
  }
}

class Father extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      child2BgColor: '#999'
    }
  }
  changeColor(color){
    this.setState({
      child2BgColor: color
    })
  }
  render(){
    return (
      <div>
        <Child1 changeChild2Color={color => this.changeColor(color)} />
        <Child2 bgColor={this.state.child2BgColor}/>
      </div>
    )
  }
}


ReactDOM.render(
  <div>
    <Component name="xnm"/>
    <ES6Component />
    <hr />
    <App />
    <hr />
    <Father />
  </div>,
  document.getElementById('app')

)