let query = '';

$(document).ready(function(){
    $('#clear').click(function(){
      query = '';
      $('#d').html('');
       $('#buttons').children().addClass("fadeOut").hide();
       $('#tier1').removeClass('fadeOut').show().addClass("fadeIn");
  });
});


function showTier2(n,q) {
  $('#tier1').addClass("animated fadeOut");
  setTimeout(function(){
    $('#tier1').hide();
    $('#' + n).removeClass('fadeOut').show().addClass("animated fadeIn");
  },700);
  query += q;
}

function showRoleCheck(t, q) {
  $(`#${t}`).removeClass('fadeIn').addClass('fadeOut');
  setTimeout(function(){
    $(`#${t}`).hide();
    $('#RoleCheck').removeClass('fadeOut').show().addClass("animated fadeIn");
  },700);
  query += q;
}

/**
 * This function uses the list found in isrouter.js to display department info
 * @param q
 */
function showPanel(q) {
  if(q === undefined) {
    q = query;
  }
  $('#buttons').children().addClass("fadeOut").hide();
  $('#d').html(`<div class="panel panel-accent animated fadeIn">
                    <div class="panel-heading text-center">
                        <h3>${list[q].title}</h3>
                     </div>
                     <div class="panel-body">
                        <h3><strong>Phone Ext:</strong> ${list[q].ext}</h3>
                        <h3><strong>Additional Info:</strong> ${list[q].message}</h3>
                     </div>
                 </div>`);
}

