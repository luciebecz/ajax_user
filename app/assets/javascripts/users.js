$(document).ready( () => {
  let baseUrl = 'http://devpoint-ajax-example-server.herokuapp.com/api/v1'
  
  fetchUsers = () => {
    let $users = $('#users')
    $users.empty();
    $.ajax({
      url: `${baseUrl}/users`,
      type: 'GET',  
      dataType: 'JSON'
    }).done( data => {
      data.forEach( user => {
        $('#users').append(`
                        <li>
                          ${user.first_name}
                          <button data-id=${user.id} class='view-btn'>View User</button>
                          <button data-id=${user.id} class='delete-btn'>Delete User</button>
                          <button data-id=${user.id} class='edit-btn'>Edit User</button>
                        </li>
                      `);
      });
    }).fail( error => {
        console.log(error)
  });
 
}
fetchUsers();

$(document).on('click', '.delete-btn', (e) => {
  let userId = $(e.target).data('id');
  $.ajax({
    url: `${baseUrl}/users/${userId}`,
    type: 'DELETE',
    dataType: 'JSON'
  }).done( data => {
    fetchUsers();
  }).fail( data => {
    console.log(data);
  });
});

$(document).on('click', '.view-btn', (e) => {
  let userId = $(e.target).data('id');
  $.ajax({
    url: `${baseUrl}/users/${userId}`,
    type: 'GET',
    dataType: 'JSON' 
  }).done( user => {
    let $userInfo = $('#user-info');
    $userInfo.html(`
      <p>${user.first_name}</p>
      <p>${user.last_name}</p>
      <p>${user.phone_number}</p>
    `);
    $userInfo.show();
  }).fail( error => {
    console.log(error);
  });
});
let $userForm = $('#user-form')
$userForm.submit( (e) => {
  e.preventDefault();
  $.ajax({
    url: `${baseUrl}/users`,
    type: 'POST',
    dataType: 'JSON',
    data: $userForm.serializeArray()
  }).done( data => {
    $userForm[0].reset();
    $('#user-first-name').focus();
    fetchUsers();
  }).fail(error => {
    console.log(error);
  });
});
});