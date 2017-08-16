/**
 * ajax call to update the application select menu
 * @param cat - the category of applications we wish to retreive
 */
function upAppList(cat) {
  // remove all previous entries, while leaving the default option
  $('#appSelect').find("option:gt(0)").remove();
  // ajax call to getApps
  $.get('/api/getApps', {
    cat: cat
  }, function(data, status) {
    // append each of the results as a select option
    $.each(data.apps, function(i, item){
      $('#appSelect')
          .append($('<option>', { value: item.AppId})
          .text(item.Application));
    });
  })
}

/**
 * generates the table of ratings based on the selected application
 * @param app - the app id of the wanted list of ratings
 */
function upRatingsTable(app) {
  // first empty the table
  $('#tbody').html('');
  $.get('/api/getRatings', {
    app: app
  }, function(data, status) {
    $.each(data.ratings, function(i, item){
      // use buildTableRow to construct the <tr> string
      // and append it to the table.
      $('#tbody').append(buildTableRow(item));
    });
  })
}

/**
 * Builds a table row
 * @param item - Object containing:
 *      - Full_Name - employee name
 *      - Application - app name
 *      - Rating - employee rating
 *      - Certified - whether employee is certified
 * @returns {string} - a row to be inserted.
 */
function buildTableRow(item) {
  // build row data in a visually understandable manner
  var row = '<tr class="animated fadeIn">';
  row += '<td class="col-md-3"><strong>' + item.Full_Name+ '</strong></td>';
  row += '<td class="col-md-3">' + item.Application + '</td>';
  row += '<td class="col-md-3">' + item.Rating + '</td>';
  if(item.Certified) {
    row += '<td class="col-md-3"><span class="glyphicon glyphicon-ok"></span></td>';
  } else {
    row += '<td class="col-md-3"><span class="glyphicon glyphicon-remove"></span></td>';
  }
  row += '</tr>';
  return row;
}


