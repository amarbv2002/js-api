let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let cityRef = document.getElementById("city");
cityRef.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    getWeather();
  }
});

//Function to fetch weather details from api and display them
let getWeather = () => {
  let cityValue = cityRef.value;
  //If input field is empty
  if (cityValue.length == 0) {
    result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
  }
  //If input field is NOT empty
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    //Clear the input field
    cityRef.value = "";
    fetch(url)
      .then((resp) => resp.json())
      //If city name is valid
      .then((data) => {
        result.innerHTML = `
        <h2>${data.name}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp}&#176;C</h1>
        <div class="temp-container">
            <div>
                <h4 class="title">min</h4>
                <h4 class="temp">${data.main.temp_min}&#176;C</h4>
            </div>
            <div>
                <h4 class="title">max</h4>
                <h4 class="temp">${data.main.temp_max}&#176;C</h4>
            </div>
        </div><br>
        <div class="temp-container">
            <div>
                <h4 class="title">pressure</h4>
                <h4 class="temp">${data.main.pressure} hpa</h4>
            </div>
            <div>
                <h4 class="title">humidity</h4>
                <h4 class="temp">${data.main.humidity} %</h4>
            </div>
        </div><br>
        <div class="temp-container">
            <div>
                <h4 class="title">wind speed</h4>
                <h4 class="temp">${data.wind.speed} m/s</h4>
            </div>
            <div>
                <h4 class="title">see level</h4>
                <h4 class="temp">${data.main.sea_level} m</h4>
            </div>
        </div>
        
        `;
      })
      //If city name is NOT valid
      .catch(() => {
        result.innerHTML = `<h3 class="msg">City not found</h3>`;
      });
  }
};
searchBtn.addEventListener("click", getWeather);
