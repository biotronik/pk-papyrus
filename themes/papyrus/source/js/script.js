var utm_params = new Array(
  ['utm_advisor', 'utm_advisor__c', 'utm_o_advisor__c'],
  ['utm_campaign', 'utm_campaign__c', 'utm_o_campaign__c'],
  ['utm_channel', 'utm_channel__c', 'utm_o_channel__c'],
  ['utm_content', 'utm_content__c', 'utm_o_content__c'],
  ['utm_medium', 'utm_medium__c', 'utm_o_medium__c'],
  ['utm_partner', 'utm_partner__c', 'utm_o_partner__c'],
  ['utm_source', 'utm_source__c', 'utm_o_source__c']
);




jQuery(function ($) {
  // Look in URL for params
  for (var o in utm_params) {
    if (getUrlParam(utm_params[o][0]) > '') setCookie(utm_params[o][0], getUrlParam(utm_params[o][0]));
  }


  // Look for forms on page
  $('form input[type=hidden]').each(function () {
    for (var o in utm_params) {
      if ($(this).prop('name') == utm_params[o][1]) $(this).val(getCookie(utm_params[o][0]));
      else if ($(this).prop('name') == utm_params[o][2]) $(this).val(getCookie(utm_params[o][0]));
    }
  });
});




/* Functions */
function getUrlParam(parameter) {
  var urlparameter = '';
  if (window.location.href.indexOf(parameter) > -1) {
    urlparameter = getUrlVars()[parameter];
  }
  return urlparameter;
}


function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
  });
  return vars;
}


function setCookie(cname, cvalue, exdays = 0) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = 'expires=0'; //  "expires="+ d.toUTCString();  <- add if you want a specific time
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}




function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}