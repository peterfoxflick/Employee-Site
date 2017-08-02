function updateUser(id) {
  userInfo = {
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



function displayName(id, name) {
  $('#dName').html(name);
  $('#rmUserBtn').attr('data-id', id);
}

function removeUser(id) {
  $.post('/adminTools/removeUser', { id: id }, function(data, status) {
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

function addEmp() {
  $.post('/adminTools/addUser', $('#newEmpForm').serialize(), function(data, status) {
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    }, {
      type: 'success'
    }).fail(function (data) {
      $.notify({
        title: '<strong>Warning!</strong>',
        message: data.responseJSON.message + '. Employee not added'
      }, {
        type: 'danger'
      });
    });
  });
  setTimeout(function(){
    window.location.reload();
  }, 5000);
}
