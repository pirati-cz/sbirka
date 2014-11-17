$(document).ready(function(){

$('#verze').change(function() {
  // set the window's location property to the value of the option the user has selected
  window.location = $(this).val();
});

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function checkUrlDate(field) {
  var arr = field.split('-');
  if (arr.length != 3) return false;
  y=+arr[0];
  m=+arr[1];
  d=+arr[2];
  if (d>31 || d<1) return false;
  if (m>12 || m<1) return false;
  if (y>2020 || y<2009) return false;
  return d+"."+m+"."+y;
}

// nastavíme zvolené datum, pokud je v adrese, jinak placeholder
var urlDate = getParameterByName("date");
var humanReadable=checkUrlDate(urlDate);
if ( humanReadable != false ) {
  $('#datum-verze').val(humanReadable);
}
else {
// nastavení šedého data na dnešní den
var now = new Date();
var d = now.getDate();
var m =  now.getMonth();
m += 1;  // JavaScript months are 0-11
var y = now.getFullYear();
$('#datum-verze').attr("placeholder",d+"."+m+"."+y);
}

function checkDate(field) {
  var arr = field.split('.');
  if (arr.length != 3) return false;
  d=+arr[0];
  m=+arr[1];
  y=+arr[2];
  if (d>31 || d<1) return false;
  if (m>12 || m<1) return false;
  if (y>2020 || y<2009) return false;
  return new Date(y,m-1,d);
}

function returnDateStamp(Date) {

        var yyyy = Date.getFullYear().toString();
        var mm = (Date.getMonth()+1).toString(); // getMonth() is zero-based
        var dd  = Date.getDate().toString();

        return yyyy + '-' + (mm[1]?mm:"0"+mm[0]) + '-' + (dd[1]?dd:"0"+dd[0]);
   };

function parseDate(input) {
  var parts = input.split('-');
  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(parts[0], parts[1]-1, parts[2]); // Note: months are 0-based
}

// we are looking for the closest date which has already elapsed
function findUpperBound(selectDate) {
  var milestones = $("#verze option");

  var refDate;
  var upperBound = parseDate("0000-01-01");

  milestones.each( function( index, element ){
     var url = $(this).val();
     var date = url.split("/").pop().split(".").shift();
   //  console.log(date);
     refDate = parseDate(date);
     if (refDate > upperBound && refDate <= selectDate) {
          upperBound = refDate; }
  });
  return returnDateStamp(upperBound);
}

$('#datum-verze').keyup(function() {
  var datum = $(this).val();
  var dateObject = checkDate(datum);
  if ( dateObject != false) {
    window.location = findUpperBound(dateObject) + ".html?date="+returnDateStamp(dateObject);}
});
});
