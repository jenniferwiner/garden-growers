function onSignIn(googleUser) {
  // Useful data for your client-side scripts:
  const profile = googleUser.getBasicProfile()

  // The ID token you need to pass to your backend:
  let id_token = googleUser.getAuthResponse().id_token

  $.ajax({
    method: 'POST',
    url: '/',
    data: {
      name: profile.getName(),
      email: profile.getEmail()
    },
    success: (data) => {
      if (data) {
        window.location = '/home'
      }
    },
    error: (err) => {
      console.log(err)
    }
  })
}

function signOut() {
  gapi.load('auth2', function() {
    gapi.auth2.init().then(function() {
      let auth2 = gapi.auth2.getAuthInstance()
      auth2.signOut().then(function() {
        auth2.disconnect()
        document.location = '/'
      })
    })
  })
}

// $('#logoutBtn').click(() => {
//   signOut()
// })
