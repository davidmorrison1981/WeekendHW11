var Country = function(name, capital) {
  this.name = name,
  this.capital = capital
}

var requestComplete = function() {
  if(this.status !== 200) return;
  var jsonString = this.responseText;
  var countries = JSON.parse(jsonString);
  var country = countries[200];
  var countriesByTimezone = formatCountryData(countries)

  var testCountry = countriesByTimezone[0][2]
  createCountryNameDisplay(testCountry);
  for(country of countriesByTimezone[0]) {
    createSelectOption(country);
  }
  checkCapitalMatch(testCountry, countriesByTimezone);

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
    if(capital == "") continue;
    var lng = countryObject[i].latlng[1];
    var aCountry = new Country( name, capital );

    if ( lng > -15 && lng < 30 ) {
      timezone1.push( aCountry );
    } else if (lng > 30 && lng < 90) {
      timezone2.push( aCountry );
    } else if (lng > 90 && lng < 180) {
      timezone3.push( aCountry );
    } else if (lng > -180 && lng < -15) {
      timezone4.push( aCountry );
    }
  }

  allTimezones.push(timezone1);
  allTimezones.push(timezone2);
  allTimezones.push(timezone3);
  allTimezones.push(timezone4);
  return allTimezones;
}

var createCountryNameDisplay = function(country) {
  var countryParagraph = document.createElement( "p" );
  countryParagraph.innerText = country.name;
  var countryDiv = document.querySelector( "#countryName" );
  countryDiv.appendChild( countryParagraph );
}

var createSelectOption = function(country) {
  var optionElement = document.createElement( "option" );
  optionElement.innerText = country.capital;
  var dropDown = document.querySelector("#capitals");
  dropDown.appendChild( optionElement );
}

var createFailureResponse = function() {
  var failureResponse = document.createElement( "h3" );
  failureResponse.innerText = "FAILURE!"
  var countryDiv = document.querySelector( "#countryName" );
  countryDiv.appendChild( failureResponse );
}

var checkCapitalMatch = function(country, allTimezones) {
  var dropDownItem = document.querySelector("select")
  var userSelectedCapital = dropDownItem.value;
  if(country.capital === userSelectedCapital) {
    switchTimezone(allTimezones);
  } else {
    createFailureResponse();
  }
}

var app = function(){
  var url = "http://localhost:5000/";
  makeRequest( url, requestComplete );
}

window.onload = app;