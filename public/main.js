const htmlDay = document.querySelector("#day");
const htmlTime = document.querySelector("#time");
const htmlDate = document.querySelector("#date");
let newTime = new Date();

// working code
let wekendDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let splitDate = newTime.toLocaleDateString().split("/");
htmlDate.innerText = `${splitDate[1]} - ${splitDate[0]} - ${splitDate[2]}`;
htmlDay.innerText = wekendDays[newTime.getDay()];

setInterval(() => {
  let timme = new Date();
  htmlTime.innerText = timme.toLocaleTimeString();
}, 1000);

//
let Bttn = document.querySelector("#searchBtn");
let cityName = document.querySelector("#cityInput");
let outputCity = document.querySelector("#city");
const centigrade = document.querySelector(".status h1");
let clouds = document.querySelector("#clouds");
cityName.focus();
const weather = async () => {
  if (cityName.value === "") {
    outputCity.innerText = "Please Enter City Name";
    return;
  } else {
    const data = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&units=metric&appid=f0da3a25b015cadb88adc5523af4d0b3`
    );
    const realData = await data.json();
    if (realData.message == "city not found") {
      outputCity.innerText = "Please Enter Correct City Name";
      cityName.value = "";
      return;
    }
    centigrade.innerHTML = `${realData.main.temp} <sup>o</sup>C`;
    outputCity.innerText = `${realData.name}, ${realData.sys.country}`;
    if (realData.weather[0].main === "Smoke") {
      clouds.setAttribute("class", "fas fa-smog");
    } else if (realData.weather[0].main === "Clear") {
      clouds.setAttribute("class", "fas fa-sun");
    } else if (realData.weather[0].main === "Clouds") {
      clouds.setAttribute("class", "fas fa-cloud");
    } else if (realData.weather[0].main === "Mist") {
      clouds.setAttribute("class", "far fa-snowflake");
    } else {
      clouds.setAttribute("class", "fas fa-cloud-sun");
    }
  }
  document.querySelector(".status").removeAttribute("style");
  cityName.value = "";
};
cityName.addEventListener("keydown", (e) => {
  if (e.keyCode == 13) {
    weather();
  } else {
    true;
  }
});
Bttn.addEventListener("click", weather);
