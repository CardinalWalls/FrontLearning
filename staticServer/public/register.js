const $form = $('form')
$form.on('submit', (e)=>{
    e.preventDefault()
    const name = $form.find('input[name=name]').val()
    const password = $form.find('input[name=password]').val()

    $.ajax({
        method: 'POST',
        url: '/register',
        contentType: 'text/json; charset=UTF-8',
        data: JSON.stringify({name, password})
    }).then(
        ()=>{
            alert("Register Success!!!")
            location.href = '/sign_in.html'
        },
        ()=>{
            alert("Failed")
        }
    )
})