/**
 * Created by Mando0975 on 7/10/2017.
 */

$(document).ready(function() {
   $('#loginBtn').click(function() {
      var loginInfo = new Object();
      loginInfo.username = $('#loginUsername').val();
      loginInfo.password = $('#loginPassword').val();
      $.post('/login', JSON.stringify(loginInfo), function(res, status) {
          console.log(res);
      })
   });
});