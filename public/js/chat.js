let user = null
let socket = null

const txtUid = document.getElementById('txtUid')
const textMessage = document.getElementById('textMessage')
const ulUsers = document.getElementById('ulUsers')
const ulMessages = document.getElementById('ulMessages')
const btnExit = document.getElementById('btnExit')

const url = (window.location.hostname.includes('localhost')) 
? 'http://localhost:8080/api/auth/' 
: 'https://restserver-project-i.herokuapp.com/api/auth/'


const validateJwt = async () => {
  const token = localStorage.getItem('token') || '';

  if(token.length <= 10) {
    window.location = 'http://localhost:8080'
    throw new Error('There is no token on the server')
  }

  try {
    const resp = await fetch(url, {
      headers: { 'auth_token': token }
    })

    const { user: userDB, token: tokenDB } = await resp.json()
    localStorage.setItem('token', tokenDB)
    
    user = userDB
    document.title = user

    await connectSocket()
  } 
  
  catch (err) {
    console.log(err)
    throw new Error("Token verification - Socket connection failed")
  }
}

textMessage.addEventListener('keyup', (keyCode) => {
  const message = textMessage.value.trim()
  const uid = txtUid.value.trim()

  if (keyCode !== 13) return
  if (message.length === 0) return

  socket.emit('send-message', { message, uid })
})

const showMessages = (messages = []) => {
  let messagesHtml = '';
  
  messages.forEach(({name, message}) => {
    messagesHtml += `
    <li>
      <p>
        <span class="text-success">${name}</span>
        <span>${message}</span>  
      </p>
    </li>
    `
  })

  ulMessages.innerHTML = messagesHtml
}

const showUsers = (users = []) => {
  let usersHtml = '';
  
  users.forEach(({name, uid}) => {
    usersHtml += `
    <li>
      <p>
        <h5 class="text-success">${name}</h5>
        <span class="fs-6 text-muted">${uid}</span> 
      </p>
    </li>
    `
  })

  ulUsers.innerHTML = usersHtml
}

const connectSocket = async () => {
  socket = io({
    'extraHeaders': {
      'Authorization-Token': localStorage.getItem('token')
    }
  })

  socket.on('connect', () => {
    console.log('New client connected');
  })

  socket.on('disconnect', () => {
    console.log('Client disconnect');
  })

  socket.on('receive-messages', showMessages)
  socket.on('active-users', showUsers)

  // private message
  socket.on('private-message', (message) => {
    console.log(message); 
  })
}

const main = async () => {
  await validateJwt()
}

main()