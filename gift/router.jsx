import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

class A extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>
        Component A
        <Switch>
          <Route exact path={this.props.match.path} render={(route) => {
            return <div>不带参数</div>
          }} />
          <Route exact path={`${this.props.match.path}/sub`} render={(route) => {
            return <div>当前组件是sub</div>
          }} />
          <Route path={`${this.props.match.path}/:id`} render={(route) => {
            return <div>带参数 参数是： {route.match.params.id}</div>
          }} />
        </Switch>
      </div>
    )
  }
}

class B extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div>Component B</div>
    )
  }
}

class Wrapper extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      
      <div style={{width: '1000px',background: '#eee',margin:'0 auto'}}>
        <Link to="/a">组件A</Link><br/>
        <Link to="/a/123">带参数-组件A</Link><br/>
        <Link to="/a/sub">/a/sub</Link><br/>
        <Link to="/b">组件B</Link>
        {this.props.children}
      </div>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Router>
        <Wrapper>
          {/*<Route path='/a' component={A} />*/}
          {/*<Route path='/a/:id' component={A} />*/}
          <Route path='/a' component={A} />
          <Route path='/b' component={B} />
        </Wrapper>
      </Router>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('app')

)