/**
 * AJAX function to update user information from the admin page
 * @param id
 */
function updateUser(id) {
  let userInfo = {
    id: id,
    email: $('#'+id+'Email').val(),
    team: $('#'+id+'Team').val(),
    assignment: $('#'+id+'Assign').val(),
    active: $('#'+id+'Active').is(':checked') ? 1 : 0,
    admin: $('#'+id+'Admin').is(':checked') ? 1 : 0
  };

  $.post('/adminTools/updateUser', userInfo, function(data, status) {
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    },{
      type: 'success'
    });
  }).fail(function(data){
    $.notify({
      title: '<strong>Warning!</strong>',
      message: data.responseJSON.message + '. Information not updated'
    }, {
      type: 'danger'
    });
  });
}


/**
 * Populates the remove user dialog with employee name
 * @param id
 * @param name
 */
function displayName(id, name) {
  $('#dName').html(name);
  // set the data-id attribute to the user id
  $('#rmUserBtn').attr('data-id', id);
}

/**
 * AJAX function to delte user from the database
 * @param id
 */
function removeUser(id) {
  $.post('/adminTools/removeUser', { id: id }, function(data, status) {
    // remove the user row from the employee table
    $('#' + id + 'Row').remove();
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    },{
      type: 'success'
    });
  }).fail(function(data) {
    $.notify({
      title: '<strong>Warning!</strong>',
      message: data.responseJSON.message + '. Employee not removed'
    }, {
      type: 'danger'
    });
  });
}

/**
 * Adds a new employee to the db
 */
function addEmp() {
  $.post('/adminTools/addUser', $('#newEmpForm').serialize(), function(data, status) {
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    }, {
      type: 'success'
    });
    }).fail(function (data) {
      $.notify({
        title: '<strong>Warning!</strong>',
        message: data.responseJSON.message + '. Employee not added'
      }, {
        type: 'danger'
      });
  });
  setTimeout(function(){
    window.location.reload();
  }, 5000);
}

let toUpdate = new Set([])

function addToUpdate(id) {
  toUpdate.add(id);
}

/**
 *
 */
function updateAll() {
  if(!toUpdate.size) {
    $.notify({
      title: '<strong>Warning!</strong>',
      message: 'No changes to save'
    }, {
      type: 'danger'
    });
    return;
  }
  let userArray = [];
  toUpdate.forEach((id) => {
      userArray.push({
          id: id,
          email: $('#'+id+'Email').val(),
          team: $('#'+id+'Team').val(),
          assignment: $('#'+id+'Assign').val(),
          active: $('#'+id+'Active').is(':checked') ? 1 : 0,
          admin: $('#'+id+'Admin').is(':checked') ? 1 : 0
      });
  });
  console.log(userArray);
  $.post('/adminTools/updateAll', {users: JSON.stringify(userArray)}, (data, status) => {
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    },{
      type: 'success'
    });
  }).fail(function(data){
    $.notify({
      title: '<strong>Warning!</strong>',
      message: data.responseJSON.message + '. Information not updated'
    }, {
      type: 'danger'
    });
  });

}