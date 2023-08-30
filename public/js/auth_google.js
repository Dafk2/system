const myForm = document.querySelector('form');
let url = (window.location.hostname.includes('localhost')) 
? 'http://localhost:8080/api/auth/login' : 'http://localhost:8080/api/auth/login'


myForm.addEventListener('submit', (event) => {
  event.preventDefault()  
  const formData = {}

  for(let el of myForm.elements) {
    if(el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url, {
    method: 'POST',
    headers:{ 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  })
  .then(resp => resp.json())
  .then(({ msg, token }) => {
    if(msg) {
      return console.error(msg)
    }

    localStorage.setItem('token', token)
    window.location = 'http://localhost:8080/api/products'
  })
  .catch(err => console.log(err))
})

onSignIn = (googleUser) => { 
  let id_token = googleUser.getAuthResponse().id_token;
  console.log(id_token)
  const data = { id_token }; 
  
  fetch(url, {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify(data), 
  })
  .then(resp => resp.json())
  .then(({ token }) => {
     console.log(`Respuesta de mi server (${token})`)
     localStorage.setItem('token', token)
     
     window.location = 'http://localhost:8080/api/products' 
  }) 
  .catch(err => console.log(err)) 
};

signOut = () => {
  let auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(() => {
    console.log('User signed out.');
  });
} 