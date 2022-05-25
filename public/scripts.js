const username = prompt('What is you username')

const socket = io('http://localhost:9000', {
    query: {
        username: username
    }
}); // the / namespace/endpoint

let nsSocket = ""; 
socket.on('nsList', (nsData) => {
    console.log('the list of namespaces has arrived')

    let namespacesDiv = document.querySelector('.namespaces')
    namespacesDiv.innerHTML = ""
    nsData.forEach((ns) => {
        namespacesDiv.innerHTML += `<div class="namespace" ns=${ns.endpoint}><img src="${ns.img}"/> </div>`
    })

    Array.from(document.getElementsByClassName('namespace')).forEach((elem) => {
        elem.addEventListener('click', (e) => {
            const nsEndpoint = elem.getAttribute('ns')
            // console.log(`I should go to ${nsEndpoint} now.`)
            joinNs(nsEndpoint)
        })
    })

   joinNs('/wiki')
})


