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
        $users.append(`
                        <li>
                          ${user.first_name}
                          <button data-id=${user.id} class='view-btn'>View User</button>
                        </li>
                      `)
      });
    }).fail( data => {
        console.log(data)
  });
 
}
fetchUsers();

$(document).on('click', '.view-btn', (e) => {
  let userId = $(e.target).data('id');
  $.ajax({
    url: `${baseUrl}/users/${userId}`,
    type: 'GET',
    dataType: 'JSON' 
  }).done( user => {
    let $userInfo = $('user-info')
    $userInfo.html(`
      <p>${user.first_name}</p>
      <p>${user.last_name}</p>
      <p>${user.phone_number}</p>
    `);
    $userInfo.show();
  }).fail( user => {
    console.log(data);
  });
});
})