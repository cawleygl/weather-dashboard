//Event listeners for page elements
var cityInputEl = $("#city-name")
var cityButtonsEl = $("#city-buttons")
var weatherEl = $("#weather-info")
var forecastEl = $("#forecast")



//Global variables
var inputCity = ""

//Event listener on submit button
$("#submit-button").on("click", function (event) {
    //Take value from city name input
    inputCity = cityInputEl.val().trim();

    //Create new button element with new city name, re-write all buttons
    var newButton = $("<a>");
    cityButtonsEl.append(newButton);
    newButton.text(inputCity)
    newButton.addClass("collection-item")
    newButton.attr("href", "#!")

    //run function to call and write weather/forecast data
    currentWeather();


});

function currentWeather() {
    //API
    var apiKey = "6577a14fe74e280aaf4799ecc064aac2"

    //set city name to lowercase
    inputCity = inputCity.toLowerCase();
    console.log(inputCity);

    //current weather data for one location by city name
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=imperial&appid=" + apiKey

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        //Create and append title with returned city name
        var cityName = $("<h3>");
        weatherEl.append(cityName);
        cityName.text(response.name)
        //Create and append list to contain weather info
        var weatherInfo = $("<ul>");
        weatherEl.append(weatherInfo);

        //Create and append temperature list item
        var temp = $("<li>");
        weatherInfo.append(temp);
        var tempF = response.main.temp.toFixed(1);
        temp.text("Temperature: " + tempF + "°F")

        //Create and append humidity list item
        var humid = $("<li>");
        weatherInfo.append(humid);
        humid.text("Humidity: " + response.main.humidity + "%")

        //Create and append wind speed list item
        var windspeed = $("<li>");
        weatherInfo.append(windspeed);
        var ws = response.wind.speed.toFixed(1);
        windspeed.text("Wind Speed: " + ws + "mph")

        //Set latitude and longitude to variable to call forecast
        var lat = response.coord.lat
        var lon = response.coord.lon
        var queryURL2 = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + apiKey

        $.ajax({
            url: queryURL2,
            method: "GET"
        }).then(function (response) {
            console.log(response)

            //Create and append UV index list item in current weather
            var uv = $("<li>");
            weatherInfo.append(uv);
            uv.text("UV Index: " + response.current.uvi)

            for (i = 0; i < 5; i++) {
            //Create and append new forecast card
            var forecastCard = $("<div>");
            forecastEl.append(forecastCard)
            forecastCard.addClass("card col s2 teal")

            var forecastPanel = $("<div>");
            forecastCard.append(forecastPanel)
            forecastPanel.addClass("card-content");

            //Create and append date container
            var forecastDate = $("<span>");
            forecastDate.addClass("card-title")
            forecastPanel.append(forecastDate);
            //Convert date input from unix and write to list
            var unixTime = response.daily[i].dt;
            console.log (unixTime);
            milliseconds = unixTime * 1000;
            console.log(milliseconds);
            dateObject = new Date(milliseconds);
            var month = dateObject.toLocaleString("en-US", {month: "numeric"});
            var day = dateObject.toLocaleString("en-US", {day: "numeric"});
            var year = dateObject.toLocaleString("en-US", {year: "numeric"});
            forecastDate.text(month + "/" + day + "/" + year);

            //Create and append temperature list item
            var forecastTemp = $("<div>");
            forecastPanel.append(forecastTemp);
            forecastTemp.text(response.daily[i].temp.day + "°F")

            //Create and append humidity list item
            var forecastHumid = $("<div>");
            forecastPanel.append(forecastHumid);
            forecastHumid.text(response.daily[i].humidity + "%")

            }

        });
    });

    //5-day forecast using log and lat from first call
    // var log = ""
    // var lat = ""

    // var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + log + "&exclude=current,minutely,hourly,daily,alerts&appid=" + apiKey


}

