import "./app2.css"
import $ from 'jquery'

$top = $("#bar")
$down = $("#content")

$top.on('click','ol',(e)=>{
    const $clicked = $(e.currentTarget)
    const index = $clicked.index()
    $clicked
        .addClass('selected')
        .siblings().removeClass('selected');
    $down 
        .children().eq(index).addClass('active')
        .siblings().removeClass('active')
        

})