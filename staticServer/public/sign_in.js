const $form = $('form')
$form.on('submit', (e)=>{
    e.preventDefault()
    const name = $form.find('input[name=name]').val()
    const password = $form.find('input[name=password]').val()

    $.ajax({
        method: 'POST',
        url: '/sign_in',
        contentType: 'text/json; charset=UTF-8',
        data: JSON.stringify({name, password})
    }).then(
        ()=>{
            alert("sign in Success!!!")
            location.href = '/home.html'
        },
        ()=>{
            alert("Failed")
        }
    )
})