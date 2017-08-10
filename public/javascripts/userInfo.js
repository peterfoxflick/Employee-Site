/**
 * $.notify comes from the bootstrap-notify package. It is a jQuery plugin
 */

$(document).ready(function(){
  $('.form-control').keyup(function() {
    $('#save').attr("disabled", false);
  });
});


/**
 * AJAX call to update the user.
 * Displays a notification of whether or not the update was successful
 */
function updateUser() {
  $.post('/userTools/updateUser',$('#userInfo').serialize(), function(data, status) {
      $.notify({
        title: '<strong>Success!</strong>',
        message: data.message,
        icon: '/images/kip.gif'
      },{
        icon_type: 'image',
        type: 'success'
      });
  }).fail(function(data){
    $.notify({
      title: '<strong>Warning!</strong>',
      icon: '/images/aaron.gif',
      message: data.responseJSON.message + '. Information not updated'
    }, {
      type: 'danger',
      icon_type: 'image'
    });
  });
}

/**
 * AJAX call to update the user password
 * displays a notification if successful, a warning if failed.
 */
function updatePwd() {
  $.post('/userTools/updatePwd', $('#updatePwd').serialize(), function(data, status) {
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message,
      icon: '/images/kip.gif'
    },{
      icon_type: 'image',
      type: 'success',
    });
    $('#changePwd').modal('hide');
  }).fail(function(data) {
    console.log(data);
    $('#warning').html('<strong>Warning!</strong> ' + data.responseJSON.message).show();
  })
}