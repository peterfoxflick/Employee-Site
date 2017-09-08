function popTable(cat){
  $('#tbody').html('');
  $.get('/userTools/getMyRatings', {
     cat: $('#catSelect').val()
  }, function(data, status){
    $.each(data.ratings, function (i, item) {
      $('#tbody').append(buildTableRow(item));
    })
  });
}

/**
 * Builds a table row
 * @param item - Object containing:
 *      - Application - app name
 *      - Rating - employee rating
 *      - Certified - whether employee is certified
 * @returns {string} - a row to be inserted.
 */
function buildTableRow(item) {
  // build row data in a visually understandable manner
  var row = '<tr>';
  row += '<td class="col-md-3"><strong>' + item.Application + '</strong></td>';
  row += '<td class="col-md-3">' + item.Rating + '</td>';
  row += '<td class="col-md-3 text-center"><input id="'+ item.GuruId +'" name="id['+ item.GuruId +'i]" type="number" class="form-control"  onkeyup="validRating(this.id, this.id+\'Valid\')" value="' + item.Rating + '">' +
      '<span class="alert alert-danger" style="display:none" id="'+ item.GuruId+'Valid"><strong>Ratings must be between 0 and 10  </strong></span></td>';
  if(item.Certified) {
    row += '<td class="col-md-3"><select class="form-control" name="cert['+ item.GuruId+'c]"><option value="1" selected>Certified</option><option value="0">Not Certified</option></select></td>';
  } else {
    row += '<td class="col-md-3"><select class="form-control" name="cert['+ item.GuruId+'c]"><option value="1">Certified</option><option value="0" selected>Not Certified</option></select></td>';
  }
  row += '</tr>';
  return row;
}

// Quick function to ensure that rating is between 1 and 10
function validRating(id, elemId) {
  var pattern = /^\d$|10$/;
  console.log(id, elemId);
  var input = document.getElementById(id);
  if (input.value.match(pattern)) {
    document.getElementById(elemId).style.display = "none";
    document.getElementById("saveRatings").disabled = false;
    return true;
  } else {
    document.getElementById(elemId).style.display = "inherit";
    document.getElementById("saveRatings").disabled = true;
    return false;
  }
}


function saveRatings() {
  var form = $('form#ratings').serializeJSON();
  console.log(form);
  $.post('/userTools/updateMyRatings', {
    ratings: form
  }, function(data, status){
    $.notify({
      title: '<strong>Success!</strong>',
      message: data.message,
      icon: '/images/kip.gif'
    },{
      icon_type: 'image',
      type: 'success'
    });
  }).fail(function(){
    $.notify({
      title: '<strong>Warning!</strong>',
      icon: '/images/aaron.gif',
      message: data.responseJSON.message + '. Information not updated'
    }, {
      type: 'danger',
      icon_type: 'image'
    });
  });

}




/**
 * jQuery serializeObject
 * @copyright 2014, macek <paulmacek@gmail.com>
 * @link https://github.com/macek/jquery-serialize-object
 * @license BSD
 * @version 2.5.0
 */
!function(e,i){if("function"==typeof define&&define.amd)define(["exports","jquery"],function(e,r){return i(e,r)});else if("undefined"!=typeof exports){var r=require("jquery");i(exports,r)}else i(e,e.jQuery||e.Zepto||e.ender||e.$)}(this,function(e,i){function r(e,r){function n(e,i,r){return e[i]=r,e}function a(e,i){for(var r,a=e.match(t.key);void 0!==(r=a.pop());)if(t.push.test(r)){var u=s(e.replace(/\[\]$/,""));i=n([],u,i)}else t.fixed.test(r)?i=n([],r,i):t.named.test(r)&&(i=n({},r,i));return i}function s(e){return void 0===h[e]&&(h[e]=0),h[e]++}function u(e){switch(i('[name="'+e.name+'"]',r).attr("type")){case"checkbox":return"on"===e.value?!0:e.value;default:return e.value}}function f(i){if(!t.validate.test(i.name))return this;var r=a(i.name,u(i));return l=e.extend(!0,l,r),this}function d(i){if(!e.isArray(i))throw new Error("formSerializer.addPairs expects an Array");for(var r=0,t=i.length;t>r;r++)this.addPair(i[r]);return this}function o(){return l}function c(){return JSON.stringify(o())}var l={},h={};this.addPair=f,this.addPairs=d,this.serialize=o,this.serializeJSON=c}var t={validate:/^[a-z_][a-z0-9_]*(?:\[(?:\d*|[a-z0-9_]+)\])*$/i,key:/[a-z0-9_]+|(?=\[\])/gi,push:/^$/,fixed:/^\d+$/,named:/^[a-z0-9_]+$/i};return r.patterns=t,r.serializeObject=function(){return new r(i,this).addPairs(this.serializeArray()).serialize()},r.serializeJSON=function(){return new r(i,this).addPairs(this.serializeArray()).serializeJSON()},"undefined"!=typeof i.fn&&(i.fn.serializeObject=r.serializeObject,i.fn.serializeJSON=r.serializeJSON),e.FormSerializer=r,r});
