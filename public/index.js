var Country = function(name, capital) {
  this.name = name,
  this.capital = capital
}

var requestComplete = function() {
  console.log( "Kiyo loves jQuery" );
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var country = countries[200];
  console.log(country.timezones);
  var countriesByTimezone = formatCountryData(countries)
  
}

var makeRequest = function( url, callBack ) {
  var request = new XMLHttpRequest();
  request.open( "GET", url );
  request.onload = callBack;
  request.send();
}

var handleButtonClick = function() {
  var button = document.querySelector("button");
  button.checkUserSubmittedCity();
}

var formatCountryData = function( countryObject ) {
  var allTimezones = [];
  var timezone1 = [];
  var timezone2 = [];
  var timezone3 = [];
  var timezone4 = [];

  for(var i=0; i<countryObject.length; i++){
    var name = countryObject[i].name;
    var capital = countryObject[i].capital;
    var lng = countryObject[i].latlng[1];
    var aCountry = new Country( name, capital );
    if ( lng > -15 && lng < 30 ) {
      timezone1.push( aCountry );
      } else if (lng > 30 && lng < 90) {
      timezone2.push( aCountry );
      } else if (lng > 90 && lng < 180) {
      timezone3.push( aCountry );
      } else if (lng > 180 && lng < -15) {
      timezone4.push( aCountry );
    }
  }
  allTimezones.push(timezone1);
  allTimezones.push(timezone2);
  allTimezones.push(timezone3);
  allTimezones.push(timezone4);
  return allTimezones;
}

var createSelectOption = function() {
  
}

var app = function(){
  var url = "http://localhost:5000/";
  makeRequest( url, requestComplete );
}

window.onload = app;