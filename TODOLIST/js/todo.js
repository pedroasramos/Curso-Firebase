// Trata a submissão do formulário de tarefas
todoForm.onsubmit = function(event) {
    event.preventDefault()
    if(todoForm.name.value != '') {
        var data = {
           name: todoForm.name.value
        }
        dbRefUsers.child(firebase.auth().currentUser.uid).push(data).then(function(){
            console.log('Tarefa "' + data.name + '" adicionada com sucesso')
        }).catch(function(error){
            showError('Falha ao adicionar tarefa: ', error)
        })
    } else {
        alert('O nome da tarefa não pode estar vazio.')
    }
}

// Exibe lista de tarefas do usuário
function fillTodoList(dataSnapshot){
    ulTodoList.innerHTML = ''
    var num = dataSnapshot.numChildren()
    todoCount.innerHTML = num + (num > 1 ? ' Tarefas' : ' Tarefa') + ':' // Exibe na interface o número de tarefas
    dataSnapshot.forEach(function(item){ // Percorre todos os elementos
        var value = item.val()
        var li = document.createElement('li') // Cria um elemento do tipo li
        var spanLi = document.createElement('span') // Cria um elemento do tipo span
        spanLi.appendChild(document.createTextNode(value.name)) // Adiciona um elemento de texto dentro da span
        spanLi.id = item.key // Define o id do spanLi com a chave da tarefa
        li.appendChild(spanLi) // Adiciona o span dentro do li
        var liRemoveBtn = document.createElement('button') // Cria um botão para remoção da tarefa
        liRemoveBtn.appendChild(document.createTextNode('Excluir')) //Define o texto do botão
        liRemoveBtn.setAttribute('onclick', 'removeTodo(\"' + item.key +'\")') // Configura o onclick do botão de remoção de tarefas
        liRemoveBtn.setAttribute('class', 'danger todoBtn') // Define classes de estilização para o botão de remoção
        li.appendChild(liRemoveBtn) // Adiciona o botão de remoção no li
        ulTodoList.appendChild(li) // Adiciona o li dentro da lista de tarefas
    })
}

// Remove tarefas
function removeTodo(key) {
    var selectedItem = document.getElementById(key)
    var confirmation = confirm('Realmente deseja remover a tarefa \"' + selectedItem.innerHTML +'\"?')
    if(confirmation) {
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().catch(function(error){
            showError('Falha ao remover tarefa: ', error)
        })
    }
}