import React from 'react' 
import TopBarProgress from 'react-topbar-progress-indicator'

TopBarProgress.config({
  barColors: {
    '0': '#2DAFCB',
    '1.0': '#2DAFCB',
  },
  barThickness: 1,
  shadowBlur: 0
})

export default (loadComponent, placeholder = '拼命加载中...') => {
  return class AsyncComponent extends React.Component {
    unmount = false

    constructor () {
      super()
      this.state = {
        Child: null
      }
    }

    componentWillUnmount () {
      this.unmount = true
    }

    async componentDidMount () {
      const { default: Child } = await loadComponent()

      if (this.unmount) return

      this.setState({ Child })
    }

    render () {
      const { Child } = this.state
      return (
        Child ? <Child {...this.props} /> : <TopBarProgress />
      )
    }
  }
}