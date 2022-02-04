const API_KEY = "66c7dc1b6600cfc76bd690fc7aeeaad8";

// get search params
const urlParams = new URLSearchParams(window.location.search);
const source = urlParams
  .get("source")
  .split(";")
  .map((x) => parseFloat(x));

// get weathr
const sourceUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${source[0]}&lon=${source[1]}&appid=${API_KEY}&units=metric`;
//const destinationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${destination[0]}&lon=${destination[1]}&appid=${API_KEY}&units=metric`;
async function getWeather() {
  const sourceResponse = await fetch(sourceUrl);
  // const destinationResponse = await fetch(destinationUrl);
  const sourceData = await sourceResponse.json();
  // const destinationData = await destinationResponse.json();
  // console.log(sourceData, destinationData);
  //   bootstrap card showing weather
  const html = `
  <div class="content">
    <div class="card">
    <div class="card-body">
        <img src="https://openweathermap.org/img/wn/${sourceData.weather[0].icon}.png" alt="weather" class="weather-icon">
        <h5 class="card-title">${sourceData.name}</h5>
        <p class="card-text">${sourceData.weather[0].main}</p>
        <p class="card-text">${sourceData.main.temp}&deg;C</p>
    </div>
    </div>
    </div>
    `;
  document.querySelector("#weather-card").innerHTML = html;
}

getWeather();
