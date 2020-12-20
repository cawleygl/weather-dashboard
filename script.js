//Event listeners for page elements
var cityInputEl = $("#city-name");
var cityButtonsEl = $("#city-buttons");
var weatherEl = $("#weather-info");
var forecastEl = $("#forecast");

//Global variables
var inputCity = "";
var buttonsArr = [];

//pull saved buttons from local storage if they exist 
var buttonsArr = JSON.parse(localStorage.getItem("cities"));

//Write saved buttons to page if something was pulled
if (buttonsArr !== null) {
    for (i = 0; i < buttonsArr.length; i++) {
        var newButton = $("<button>");
        cityButtonsEl.append(newButton);
        newButton.text(buttonsArr[i])
        newButton.attr("data-city", buttonsArr[i])
        newButton.addClass("btn waves-effect waves-light")
        var pgBreak = $("<br>");
        cityButtonsEl.append(pgBreak);
    }
}

//reset buttons array
var buttonsArr = [];

//Event listener on submit button
$("#submit-button").on("click", function (event) {
    //Take value from city name input
    inputCity = cityInputEl.val().trim();

    //Create and append new button element with new city name
    var newButton = $("<button>");
    cityButtonsEl.append(newButton);
    newButton.text(inputCity)
    newButton.attr("data-city", inputCity)
    newButton.addClass("btn waves-effect waves-light")
    var pgBreak = $("<br>");
    cityButtonsEl.append(pgBreak);

    //pull saved buttons from local storage if they exist
    buttonsArr = JSON.parse(localStorage.getItem("cities"));

    //add new input to buttons array
    console.log(buttonsArr);
    buttonsArr.push(inputCity);

    //store new array in local storage
    localStorage.setItem("cities", JSON.stringify(buttonsArr));

    //reset buttons array
    buttonsArr = [];

    //run function to call and write weather/forecast data
    currentWeather();
    console.log("submitted city from text");


});

$("#city-buttons").on("click", function (event) {
    //Set inputCity variable to data value (city name)
    event.preventDefault();

    inputCity = ($(event.target).data("city"));
    console.log("*" + inputCity + "*")

    //run currentWeather again for given city
    currentWeather();
    console.log(inputCity + " button")


});


function currentWeather() {

    //clear current weather and forecast info
    weatherEl.empty();
    forecastEl.empty();
    console.log("cleared")


    //API
    var apiKey = "6577a14fe74e280aaf4799ecc064aac2"

    //set city name to lowercase
    inputCity = inputCity.toLowerCase();

    //current weather data for one location by city name
    var queryURL1 = "https://api.openweathermap.org/data/2.5/weather?q=" + inputCity + "&units=imperial&appid=" + apiKey

    $.ajax({
        url: queryURL1,
        method: "GET"
    }).then(function (response) {
        console.log("call 1")
        console.log(response.weather[0])

        //Create and append title with returned city name and date
        var cityName = $("<h3>");
        weatherEl.append(cityName);
        //Convert date input from unix and write to list
        var unixTime = response.dt;
        milliseconds = unixTime * 1000;
        dateObject = new Date(milliseconds);
        var month = dateObject.toLocaleString("en-US", { month: "numeric" });
        var day = dateObject.toLocaleString("en-US", { day: "numeric" });
        var year = dateObject.toLocaleString("en-US", { year: "numeric" });
        cityName.text(response.name + " (" + month + "/" + day + "/" + year + ")");

        //Append icon to title for current weather status
        var cityIcon = $("<img>");
        cityName.append(cityIcon)

        if (response.weather[0].icon === "01d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/01d@2x.png")
        } else if (response.weather[0].icon === "01n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/01n@2x.png")
        } else if (response.weather[0].icon === "02d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/02d@2x.png")
        } else if (response.weather[0].icon === "02n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/02n@2x.png")
        } else if (response.weather[0].icon === "03d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/03d@2x.png")
        } else if (response.weather[0].icon === "03n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/03n@2x.png")
        } else if (response.weather[0].icon === "04d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/04d@2x.png")
        } else if (response.weather[0].icon === "04n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/04n@2x.png")
        } else if (response.weather[0].icon === "09d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/09d@2x.png")
        } else if (response.weather[0].icon === "09n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/09n@2x.png")
        } else if (response.weather[0].icon === "10d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/10d@2x.png")
        } else if (response.weather[0].icon === "10n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/10n@2x.png")
        } else if (response.weather[0].icon === "11d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/11d@2x.png")
        } else if (response.weather[0].icon === "11n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/11n@2x.png")
        } else if (response.weather[0].icon === "13d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/13d@2x.png")
        } else if (response.weather[0].icon === "13n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/13n@2x.png")
        } else if (response.weather[0].icon === "50d") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/50d@2x.png")
        } else if (response.weather[0].icon === "50n") {
            cityIcon.attr("src", "http://openweathermap.org/img/wn/50n@2x.png")
        }


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
            console.log("call 2")
            console.log(response)

            //Create and append UV index list item in current weather
            var uv = $("<li>");
            weatherInfo.append(uv);
            var uvDiv = $("<div>");
            uv.append(uvDiv);

            uvDiv.text("UV Index: ")
            uvDiv.css("float", "left");

            var uvBadge = $("<span>");
            uv.append(uvBadge);
            uvBadge.text(response.current.uvi.toFixed(2));
            uvBadge.css("float", "left");

            if (response.current.uvi < 3) {
                uvBadge.addClass("badge green white-text")
            } else if (response.current.uvi >= 3 && response.current.uvi < 6) {
                uvBadge.addClass("badge yellow black-text")
            } else if (response.current.uvi >= 6 && response.current.uvi < 8) {
                uvBadge.addClass("badge orange white-text")
            } else if (response.current.uvi >= 8 && response.current.uvi < 11) {
                uvBadge.addClass("badge red white-text")
            } else {
                uvBadge.addClass("badge purple white-text")
            }

            for (i = 1; i < 6; i++) {
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
                milliseconds = unixTime * 1000;
                dateObject = new Date(milliseconds);
                var month = dateObject.toLocaleString("en-US", { month: "numeric" });
                var day = dateObject.toLocaleString("en-US", { day: "numeric" });
                var year = dateObject.toLocaleString("en-US", { year: "numeric" });
                forecastDate.text(month + "/" + day + "/" + year);

                //Append icon for current weather status
                var forecastIcon = $("<img>");
                forecastPanel.append(forecastIcon)

                if (response.daily[i].weather[0].icon === "01d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/01d@2x.png")
                } else if (response.daily[i].weather[0].icon === "01n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/01n@2x.png")
                } else if (response.daily[i].weather[0].icon === "02d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/02d@2x.png")
                } else if (response.daily[i].weather[0].icon === "02n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/02n@2x.png")
                } else if (response.daily[i].weather[0].icon === "03d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/03d@2x.png")
                } else if (response.daily[i].weather[0].icon === "03n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/03n@2x.png")
                } else if (response.daily[i].weather[0].icon === "04d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/04d@2x.png")
                } else if (response.daily[i].weather[0].icon === "04n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/04n@2x.png")
                } else if (response.daily[i].weather[0].icon === "09d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/09d@2x.png")
                } else if (response.daily[i].weather[0].icon === "09n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/09n@2x.png")
                } else if (response.daily[i].weather[0].icon === "10d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/10d@2x.png")
                } else if (response.daily[i].weather[0].icon=== "10n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/10n@2x.png")
                } else if (response.daily[i].weather[0].icon === "11d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/11d@2x.png")
                } else if (response.daily[i].weather[0].icon === "11n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/11n@2x.png")
                } else if (response.daily[i].weather[0].icon === "13d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/13d@2x.png")
                } else if (response.daily[i].weather[0].icon === "13n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/13n@2x.png")
                } else if (response.daily[i].weather[0].icon === "50d") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/50d@2x.png")
                } else if (response.daily[i].weather[0].icon === "50n") {
                    forecastIcon.attr("src", "http://openweathermap.org/img/wn/50n@2x.png")
                }

                //Create and append temperature list item
                var forecastTemp = $("<div>");
                forecastPanel.append(forecastTemp);
                forecastTemp.text(response.daily[i].temp.day + "°F")

                //Create and append humidity list item
                var forecastHumid = $("<div>");
                forecastPanel.append(forecastHumid);
                forecastHumid.text(response.daily[i].humidity + "% Humidity")


            }

            inputCity = ""
            console.log("reset inputCity")
            console.log("----------------------------------------------")

        });
    });
}






