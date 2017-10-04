let query = '';

$(document).ready(function(){
    $('#clear').click(function(){
       query = '';
       $('#d').html('');
       $('#buttons').children().addClass("fadeOutDown").hide();
       $('#tier1').removeClass('fadeOutDown').show().addClass("fadeIn");
  });
});


function showTier2(n,q) {
  $('#tier1').addClass("animated fadeOutDown");
  setTimeout(function(){
    $('#' + n).removeClass('fadeOutDown').show().addClass("animated fadeIn");
    $('#tier1').hide();
  },400);
  query += q;
}

function showRoleCheck(t, q) {
  $(`#${t}`).removeClass('fadeIn').addClass('fadeOutDown');
  setTimeout(function(){
    $('#RoleCheck').removeClass('fadeOutDown').show().addClass("animated fadeIn");
    $(`#${t}`).hide();
  },400);
  query += q;
}

function showMacRoleCheck(t) {
  $(`#${t}`).removeClass('fadeIn').addClass('fadeOutDown');
  setTimeout(function(){
    $('#RoleCheckMac').removeClass('fadeOutDown').show().addClass("animated fadeIn");
    $(`#${t}`).hide();
  },400);
}

function showPersonalCheck(t, q){
  $(`#${t}`).removeClass('fadeIn').addClass('fadeOutDown');
  setTimeout(function(){
    $('#personalCheck').removeClass('fadeOutDown').show().addClass("animated fadeIn");
    $(`#${t}`).hide();
  },400);
  query += q;
}

function showiLearnTier() {
  $('#buttons').children().addClass("fadeOutDown");
  setTimeout(function(){
    $('#buttons').children().hide();
    $('#ilearnTier').removeClass('fadeOutDown').show().addClass("animated fadeIn");
  },400);
}

/**
 * This function uses the list found in isrouter.js to display department info
 * @param q
 */
function showPanel(q) {
  if(q === undefined) {
    q = query;
  }
  $('#buttons').children().addClass("fadeOutDown").hide();
  $('#d').html(`<div class="panel panel-accent animated fadeIn">
                    <div class="panel-heading text-center">
                        <h3>${list[q].title}</h3>
                     </div>
                     <div class="panel-body">
                        <h3><strong>Phone Ext:</strong> ${list[q].ext}</h3>
                        <h3><strong>Ticket:</strong> <a href="${list[q].ticketURL}" target="_blank">${list[q].ticket}</a></h3>
                        <h3><strong>Additional Info:</strong> ${list[q].message}</h3>
                     </div>
                 </div>`);
}

