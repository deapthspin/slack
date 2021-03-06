function joinRoom(roomName) {
    nsSocket.emit('joinRoom', roomName, (newNumberOfMembers) => {
        document.querySelector('.curr-room-num-users').innerHTML = `${newNumberOfMembers} <span class="glyphicon glyphicon-user"/>`
    })
    nsSocket.on('historyCatchup', (history) => {
        if(!history) {
            console.log('very undefined')
        } else {
            const messagesUl = document.querySelector('#messages')
        messagesUl.innerHTML = ""
        history.forEach((msg) => {
            const newMsg = buildHTML(msg)
            const currentMessages = messagesUl.innerHTML
            messagesUl.innerHTML = currentMessages + newMsg
        })
        messagesUl.scrollTo(0, messagesUl.scrollHeight)
        }
        
    })
    nsSocket.on('updateMembers', (numMembers) => {
        document.querySelector('.curr-room-num-users').innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"/>`
        document.querySelector('.curr-room-text').innerText = `${roomName}`

    })

    let searchBox = document.querySelector('#search-box')

    searchBox.addEventListener('input',(e) => {
        let messages = Array.from(document.getElementsByClassName('message-text'))

        messages.forEach((msg) => {
            if(msg.innerText.toLowerCase().indexOf(e.target.value.toLowerCase()) === -1) {
                msg.style.display = "none"
            } else {
                msg.style.display = "block"
            }
        })
    })
}