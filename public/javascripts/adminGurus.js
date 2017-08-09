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

function addCategory() {
  $.post('/adminTools/addCategory', {cat: $('#newCat').val() }, function(data, status) {
    appendCat(data.cat, data.catId);
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    }, {
      type: 'success'
    });

  }).fail(function (data) {
      $.notify({
        title: '<strong>Warning!</strong>',
        message: data.responseJSON.message + '. Category not added'
      }, {
        type: 'danger'
      });
  });
}


function appendCat(cat, catId) {
  var option = '<option value="' + catId + '">' + cat+ '</option>';
  $('#catSelect').append(option);
  $('#catSelectApps').append(option);
  var input =  '<div class="input-group">' +
      '<span class="input-group-addon" data-toggle="tooltip" title="Click to Edit" onclick="enableCatEdit(' + catId + ')"> ' +
      '<i class="glyphicon glyphicon-edit"></i></span>' +
      '<input class="form-control" value="'+ cat +'" id="' + catId+ '" disabled> </div>'
  $('#cats').append(input);
}

function addApp() {

  console.log($('#catSelectApps').val(),$('#newApp').val() );
  // $.post('/adminTools/addApplication', {
  //   cat: $('#catSelectApps').val(),
  //   app: $('#newApp').val()
  // }, function(data, status){
  //   $.notify({
  //     title: '<strong>Success!</strong>',
  //     message: data.message
  //   }, {
  //     type: 'success'
  //   });
  // }).fail(function(data){
  //   $.notify({
  //     title: '<strong>Warning!</strong>',
  //     message: data.responseJSON.message + '. Application not added'
  //   }, {
  //     type: 'danger'
  //   });
  // });
}
