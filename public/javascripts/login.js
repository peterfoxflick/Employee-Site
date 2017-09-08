/**
 * Created by Mando0975 on 7/10/2017.
 */

$(document).ready(function () {

  // this lets them just press enter instead of clicking the button
  $('#loginPassword').keyup(function(event){
    if(event.keyCode === 13) {
      console.log('clicking button');
      $('#loginBtn').click();
    }
  });


    $('#loginBtn').click(function(){
      var loginInfo = {};
      console.log('this was triggered');
      loginInfo.username = $('#loginUsername').val();
      loginInfo.password = $('#loginPassword').val();
      $.post('/login', loginInfo, function (res, status) {
        //noinspection EqualityComparisonWithCoercionJS
        if (!res.err) {
          window.location.reload();
        } else {
          $('#warning').show();
        }
      })
    });

});

function login() {
  var loginInfo = new Object();
  console.log('this was triggered');
  loginInfo.username = $('#loginUsername').val();
  loginInfo.password = $('#loginPassword').val();
  $.post('/login', loginInfo, function (res, status) {
    //noinspection EqualityComparisonWithCoercionJS
    if (!res.err) {
      window.location.reload();
    } else {
      $('#warning').show();
    }
  })
}