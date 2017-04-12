$(document).ready(() => {
  // Delete user
  $('.deleteUser').click(() => {
    let id = $(event.target).attr('data-id')
    $.ajax({
      method: 'DELETE',
      url: '/admin',
      data: {
        id: id
      },
      success: (data) => {
        if (data) {
          location.reload()
        }
      },
      error: (err) => {
        console.log('Error: ', err)
      }
    })
  })
})
