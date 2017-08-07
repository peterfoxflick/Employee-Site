$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();
});

function upAppList(cat) {
  // remove all previous entries, while leaving the default option
  $('#editAppTarget').html('');
  // ajax call to getApps
  $.get('/api/getApps', {
    cat: cat
  }, function(data, status) {
    // append each of the results as a select option
    $.each(data.apps, function(i, item){
      $('#editAppTarget').append('<div class="input-group">' +
          '<span class="input-group-addon" data-toggle="tooltip" title="Click to Edit" onclick="enableAppEdit('+ item.AppId + ')">' +
          '<i class="glyphicon glyphicon-edit"></i>' +
          '</span>' +
          '<input class="form-control" value="'+ item.Application + '" id="<%= cats[i].CatId%>" disabled>' +
          '</div>')
    });
  })
}