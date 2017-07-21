$(document).ready(function(){
  $('.form-control').keyup(function() {
    $('#save').attr("disabled", false);
  });
});

function updateUser() {
  $.post('/api/updateUser',$('#userInfo').serialize(), function(data, status) {
      $.notify({
        title: '<strong>Success!</strong>',
        message: data.message
      },{
        type: 'success'
      });
  }).fail(function(data){
    console.log(data);
    $.notify({
      title: '<strong>Warning!</strong>',
      message: data.responseJSON.message + '. Information not updated'
    }, {
      type: 'danger'
    })
  });
}