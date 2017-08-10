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
    $.each(data.apps, function(i, item){
      buildInputGroup(item);
    });
    $('#editAppTarget').append('<br><button class="btn btn-accent" onclick="updateApps()">Save</button>');
    $('[data-toggle="tooltip"]').tooltip();
  })
}

function buildInputGroup(item) {
  var options = $('#catSelectApps > option').clone();
  var selectId = item.AppId + 'cat';
  $('#editAppTarget').append('<div class="input-group">' +
      '<span class="input-group-addon">' +
      '<i class="glyphicon glyphicon-edit"></i>' +
      '</span>' +
      '<input data-toggle="tooltip" title="Double Click to Edit" class="form-control editApp" value="'+ item.Application +
      '" id="' + item.AppId + 'app" data-id="' + item.AppId + '" readOnly="true" ondblclick="this.readOnly = null; $(this).addClass(\'upapp\')">' +
      '<select class="form-control appCatSelect" id="' + selectId + '" onchange="$(\'#' + item.AppId + 'app\').addClass(\'upapp\')"></select></div>');
  $('#' + selectId).append(options);
  $('#' + selectId).val($('#catSelectApps').val())
}

function addCategory() {
  $.post('/adminTools/addCategory', {cat: $('#newCat').val() }, function(data, status) {
    appendCat(data.cat, data.catId);
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message,
      icon: '/images/kip.gif'
    }, {
      icon_type: 'image',
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
  $.post('/adminTools/addApplication', {
    cat: $('#catSelectAddApp').val(),
    app: $('#newApp').val()
  }, function(data, status){
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message
    }, {
      type: 'success'
    });
  }).fail(function(data){
    $.notify({
      title: '<strong>Warning!</strong>',
      message: data.responseJSON.message + '. Application not added'
    }, {
      type: 'danger'
    });
  });
}


function updateCats(){
  var cats = $('.upcats');
  $.each(cats, function (index, value) {
    $.post('/adminTools/updateCat', {
      catId: value.id,
      cat: value.value
    }, function(){
      $.notify({
        title:'<strong>Success!</strong>',
        message: value.value + ' was updated'
      }, {
        type: 'success'
      })
    }).fail(function(){
      $.notify({
        title:'<strong>Warning!</strong>',
        message: value.value + 'was not updated'
      }, {
        type: 'danger'
      })
    });
  });
}

function updateApps(){
  var apps = $('.upapp');
  $.each(apps, function(index, value){

    $.post('/adminTools/updateApp', {
      appId: value.dataset.id,
      app: value.value,
      catId: $('#' + value.dataset.id + 'cat').val()
    }, function(status, data){
      $.notify({
        title:'<strong>Success!</strong>',
        message: value.value + ' was updated'
      }, {
        type: 'success'
      })
    }).fail(function(){
      $.notify({
        title:'<strong>Warning!</strong>',
        message: value.value + 'was not updated'
      }, {
        type: 'danger'
      });
    });
  });
}

function popCatDelModal(catId, cat) {
  $('#catToDel').html(cat);

  $('#delCatBtn').click(function() {
    delCat(catId);
  });
}

function delCat(catId) {
  alert(catId);
}