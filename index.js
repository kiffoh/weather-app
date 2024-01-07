async function newPlace(content="london") {
    const subject = content.toLowerCase();
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=f0d919f2079c4eabb02123135232212&q=${subject}`, {mode: 'cors'})
    const Data = await response.json();
    getData(Data);
    console.log(getData(Data));
    console.log(Data);
    console.log(Data["current"]["condition"]["text"])
}
newPlace();
  
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

  // Current
  let condition = Data["current"]["condition"]["text"];
  let conditionImg = Data["current"]["condition"]["icon"];
  let feelsLikeC = Data["current"]["feelslike_c"];
  let gustMPH = Data["current"]["gust_mph"];
  let precipMM = Data["current"]["precip_mm"];
  let pressureMb = Data["current"]["pressure_mb"];
  let tempC = Data["current"]["temp_c"];
  let uv = Data["current"]["uv"];
  let visibilityMiles = Data["current"]["vis_miles"];

  return {country, localTime, name, region, timezone, condition, conditionImg, feelsLikeC, gustMPH, precipMM, pressureMb, tempC, uv, visibilityMiles}
}
