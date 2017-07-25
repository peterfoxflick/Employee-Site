/**
 * Used to display weekly log reminder,
 * and a cookie to determine if they've seen it.
 * View js-cookie.js for the js cookie code.
 */
$(document).ready(function() {
  if(!Cookies.get('shown')) {
    $('#weekLog').modal('show');
  }

  $('#close').click(function() {
    Cookies.set('shown', true, {expires: 1});
  });
});

