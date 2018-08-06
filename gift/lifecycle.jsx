import React from 'react'
import ReactDOM from 'react-dom'


class Component extends React.Component {
  constructor(props){
    console.log('1 - constructor')
    super(props)
    // this.state = {
    //   data: props.data
    // }
  }
  componentWillMount() {
    console.log('2 - componentWillMount')
  }
  componentDidMount() {
    console.log('4 - componentDidMount')
  }
  componentWillReceiveProps(nextProps) {
    console.log('接收父组件传来的props')
  }
  shouldComponentUpdate(nextProps) {
    // 子组件是否需要更新
    return nextProps.data !== this.props.data
  }
  componentWillUpdate() {
    console.log('如果shouldComponentUpdate返回true，才会触发') 
  }
  componentDidUpdate() {
    console.log('已更新,如果shouldComponentUpdate返回true，在render之后才会触发') 
  }
  componentWillUnmount() {
    console.log('组件被卸载的时候调用。一般在componentDidMount里面注册的事件需要在这里删除')
  }

  render() {
    console.log('3 - render,初始化时触发, props/state改变时也会触发，但如果shouldComponentUpdate为false，则不触发')
    return (
      <div>
        <h4>Child</h4>
        <p>{this.props.data}</p>
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: 'old props'
    }
  }
    handleClick(){
    this.setState({
      data: 'new state'
    })
  }
  render() {
    return (
      <div>
        <h2>Father</h2>
        <Component {...this.state}/>
        <button onClick={()=>{this.handleClick()}}>改变props</button>
      </div>
    )
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('app')

)