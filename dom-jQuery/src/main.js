const api = $('.test')

api.addClass('red').find('.child').addClass('blue')
    .end()
    .addClass('yellow')
api.children().print()
    
