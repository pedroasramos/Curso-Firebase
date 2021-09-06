authForm.onsubmit = function(evento) {
    Event.preventDefault()
    if (authForm.submitAuthForm.innerHtml == 'Acessar') {
        firebase.auth().sigInWithEmailAndPassword(authForm.email.value, authForm.password.value)
            .then(function(user){
                console.log('Acesso com sucesso')
                console.log(user)
        }).catch(function(error){
            console.log('Falha no acesso')
            console.log(error)
        })
    } else {
        
    }
}