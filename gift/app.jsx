import React from 'react'
import ReactDOM from 'react-dom'

let style = {
  color: 'red',
  fontSize: '30px'
}

let name = 'xfz'
let flag = false;
let names = ['Rose', 'xfz']
let jsx = (
  
  <div style={style}>
    {/* 变量使用 */}
    <p>I am {name}</p>  
    {/* 条件判断 */}
    {
      flag ? <p>I am {name}</p> : <p>I not xx</p>
    }
    {/* 数组循环 */}
    {
      names.map((item,index) => <p key={index}>{item}</p>)
    }
  </div>
)

ReactDOM.render(
  jsx, 
  document.getElementById('app')

)