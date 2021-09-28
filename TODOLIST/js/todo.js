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

        todoForm.name.value = ''
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

        var liUpdateBtn = document.createElement('button') // Cria um botão para atualizar a tarefa
        liUpdateBtn.appendChild(document.createTextNode('Editar')) //Define o texto do botão
        liUpdateBtn.setAttribute('onclick', 'updateTodo(\"' + item.key +'\")') // Configura o onclick do botão de atualização de tarefas
        liUpdateBtn.setAttribute('class', 'alternative todoBtn') // Define classes de estilização para o botão de atualização
        li.appendChild(liUpdateBtn) // Adiciona o botão de atualização no li

        ulTodoList.appendChild(li) // Adiciona o li dentro da lista de tarefas
    })
}

// Remove tarefas
function removeTodo(key) {
    var selectedItem = document.getElementById(key)
    var confirmation = confirm('Realmente deseja remover a tarefa \"' + selectedItem.innerHTML +'\"?')
    if(confirmation) {
        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).remove().then(function(){
            console.log('Tarefa "' + selectedItem.innerHTML + '" removida com sucesso')
        }).catch(function(error){
            showError('Falha ao remover tarefa: ', error)
        })
    }
}

// Atualiza tarefas
function updateTodo(key) {
    var selectedItem = document.getElementById(key)
    var newTodoName = prompt('Escolha o um novo nome para a tarefa \"' + selectedItem.innerHTML + '\".', selectedItem.innerHTML)
    if(newTodoName != ''){
        var data = {
            name: newTodoName
        }

        dbRefUsers.child(firebase.auth().currentUser.uid).child(key).update(data).then(function(){
            console.log('Tarefa "' + data.name + '" atualizada com sucesso')
        }).catch(function(error){
            showError('Falha ao atualizar tarefa: ', error)
        })
    } else{
        alert('O nome da tarefa não pode ficar vazio para atualizar a tarefa')
    }
}