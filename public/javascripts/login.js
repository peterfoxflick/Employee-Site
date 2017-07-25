/**
 * Created by Mando0975 on 7/10/2017.
 */

$(document).ready(function() {

  /**
   * Sets a listener for the login button to
   * post the data to the server
   */
  $('#loginBtn').click(function() {
      var loginInfo = new Object();
      loginInfo.username = $('#loginUsername').val();
      loginInfo.password = $('#loginPassword').val();
      $.post('/login', loginInfo, function(res, status) {
          //noinspection EqualityComparisonWithCoercionJS
        if(!res.err) {
            window.location.replace("/");
        } else {
           $('#warning').show();
        }
      })
   });
});