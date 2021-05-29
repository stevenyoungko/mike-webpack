import '../scss/index.scss';
import '../index.html'
import 'babel-polyfill'

let arr = [1,2,3]
arr.map((obj) => console.log(obj))

var obj = require('./obj.js')
console.log(obj)

import item from './item.js'
console.log(item)


class Main {

  state = {
    name: 'Steven'
  }

  constructor() {
    // this.name = 'Steven'
    // this.logState()

    // 這邊this會指向自己本身 所以會監聽不到t this.name
    document.querySelector('#link').addEventListener('click', this.logState)
  }

  logState = () => {
    console.log(this.state.name)
  }
}

new Main()