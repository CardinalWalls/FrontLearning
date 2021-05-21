import "./app1.css"
import $ from 'jquery'

const $number = $("#number");

const model = {
  data : {
    number: parseInt(localStorage.getItem('number'))
  },

  update(operation){
    Object.assign(model.data, operation)
    localStorage.setItem('number', model.data.number)
    $number.text(model.data.number)
  }
}

const control = {
  start : null,
  init(container){
    control.start = $(container)

    model.update({number : 1001})

    control.autoBindEvents()
    },

  events:{
      'click #add1': 'add',
      'click #minus1': 'minus',
      'click #mul2': 'mul',
      'click #div2': 'div',
  },
  add(){
    model.update({number : model.data.number + 1})
  },
  minus(){
    model.update({number : model.data.number - 1})
  },
  mul(){
    model.update({number : model.data.number * 2})
  },
  div(){
    model.update({number : model.data.number / 2})
  },

  autoBindEvents(){
    for(let key in control.events){
      let space = key.indexOf(' ')
      let part1 = key.slice(0, space)
      let part2 = key.slice(space + 1)
      let value = control.events[key]
      control.start.on(part1, part2, control[value])
    }
  }


}

export default control