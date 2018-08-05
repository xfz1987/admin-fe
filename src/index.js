import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import { myTest } from './test.js'

alert(myTest())

ReactDOM.render(
  <div>
    <p>666</p>
  </div>,
  document.getElementById('app')
)

// 只有当开启了模块热替换时 module.hot 才存在
// if (module.hot) {
//   module.hot.accept(['./App'], () => {
//     render(<App/>, document.getElementById('app'));
//   });
// }