import "./app3.css"
import $ from 'jquery'

const $square=$("#square")

$square.on("click",()=>{
    $square.toggleClass('active')
})