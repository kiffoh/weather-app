document.addEventListener('DOMContentLoaded', function() {
  async function newPlace(content="london") {
    Data = await apiCall(content)
    console.log(Data)
    const weatherData = getData(Data);
    displayData(weatherData);
  }
  newPlace();

  async function apiCall(content) {
    const subject = content.toLowerCase();
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f0d919f2079c4eabb02123135232212&q=${subject}`, {mode: 'cors'})
    return await response.json();
  }
    
    const search = document.querySelector(".search");
    search.addEventListener("click", () => {
      const content = document.querySelector(".content").value;
      console.log(content);
      newPlace(content);
    })

  function getData(Data) {
    // Location
    let country = Data["location"]["country"];
    let localTime = Data["location"]["localtime"];
    let name = Data["location"]["name"];
    let region = Data["location"]["region"];
    let timezone = Data["location"]["tz_id"];

    let americanDate = localTime.split(" ")[0];
    let [year, month, day] = americanDate.split("-");
    let date = `${day}/${month}/${year}`;
    localTime = localTime.split(" ")[1];

    // Current
    let condition = Data["current"]["condition"]["text"];
    let conditionImg = Data["current"]["condition"]["icon"];
    conditionImg = conditionImg.replace('64x64', '128x128');
    let feelsLikeC = Data["current"]["feelslike_c"];
    let gustMPH = Data["current"]["gust_mph"];
    let precipMM = Data["current"]["precip_mm"];
    let pressureMb = Data["current"]["pressure_mb"];
    let tempC = Data["current"]["temp_c"];
    let uv = Data["current"]["uv"];
    let visibilityMiles = Data["current"]["vis_miles"];

    return {country, localTime, date, name, region, timezone, condition, conditionImg, feelsLikeC, gustMPH, precipMM, pressureMb, tempC, uv, visibilityMiles}
  }

  function displayData(weatherData) {
    const location = document.querySelector('.location');
    const current = document.querySelector('.current');

    // Location elements
    const countryDiv = location.querySelector('.country');
    const localTimeDiv = location.querySelector('.localTime');
    const nameDiv = location.querySelector('.name');
    const localDateDiv = location.querySelector('.localDate');
    const timezoneDiv = location.querySelector('.timezone');

    // Current elements
    const conditionDiv = current.querySelector('.condition');
    const conditionTextDiv = conditionDiv.querySelector('.condition');
    const conditionImg = conditionDiv.querySelector('.conditionImg');
    const feelsLikeCDiv = document.querySelector('.feelsLikeC');
    const gustMPHDiv = document.querySelector('.gustMPH');
    const precipMMDiv = document.querySelector('.precipMM');
    const pressureMbDiv = document.querySelector('.pressureMb');
    const tempCDiv = document.querySelector('.tempC');
    const uvDiv = document.querySelector('.uv');
    const visibilityMilesDiv = document.querySelector('.visibilityMiles');

    // Set the content of each div with the corresponding data from weatherData
    countryDiv.textContent = weatherData.country;
    localTimeDiv.textContent = weatherData.localTime;
    localDateDiv.textContent = weatherData.date;
    nameDiv.textContent = `${weatherData.name}, ${weatherData.region}`;
    // regionDiv.textContent = weatherData.region;
    timezoneDiv.textContent = `Timezone: ${weatherData.timezone}`;
    conditionTextDiv.textContent = weatherData.condition;
    conditionImg.src = `https:${weatherData.conditionImg}`;
    feelsLikeCDiv.textContent = `Feels like: ${weatherData.feelsLikeC} C`;
    gustMPHDiv.textContent = `Gust speed: ${weatherData.gustMPH} mph`;
    precipMMDiv.textContent = `Precipition: ${weatherData.precipMM} mm`;
    pressureMbDiv.textContent = `Pressure: ${weatherData.pressureMb} mBar`;
    tempCDiv.textContent = `Temperature: ${weatherData.tempC} C`;
    uvDiv.textContent = `UV: ${weatherData.uv}`;
    visibilityMilesDiv.textContent = `Visibility: ${weatherData.visibilityMiles} miles`;
  };
});