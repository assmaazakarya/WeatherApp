// photos api
// https://api.unsplash.com/search/photos?query=cairo&client_id=1izY2c-7eWsOlv3-s00POn0MznY8FXqHRZF1yRWnj5Y
// weather
// http://api.weatherapi.com/v1/search.json?key=42470ce511ef4c9786e151959252904&q=lond&days=7


// first of all =>  get users location 
// second get the weather based on the user's location 
// ! HTML Elements
let currentImg = document.querySelector(".current-img")
let temp = document.querySelector(".temp")
let dayname = document.querySelector(".dayname")
let city = document.querySelector(".city")
let country = document.querySelector(".country")
let cityImg = document.querySelector(".city-img")
let search = document.querySelector("input")
let wind = document.querySelector('.wind')
let windDir = document.querySelector(".windDir") 
let sunrise = document.querySelector(".sunrise")
let sunset = document.querySelector(".sunset")
let humidity = document.querySelector(".humidity")
let uv = document.querySelector(".uv")
let vis_km = document.querySelector(".vis-km")
let vis_miles = document.querySelector(".vis-miles")
let max = document.querySelector(".max")
let min = document.querySelector(".min")
let weatherDays = document.querySelector(".weatherDays")
// ? App Variable
var today = {};
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// * Functions 
function getUserLocation(){
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(
        function(position){
           let lat = position.coords.latitude;
           let lon = position.coords.longitude; 
           let location = lat + ',' +lon;
           getWeatherByLatAndLon(location)
      }, 
    function(error){
        console.log(error);        
    })
    }else{
        alert("Your browser does not support geolocation")
    }
}
getUserLocation()
async function getWeatherByLatAndLon(location){
   let response = await fetch
   (`https://api.weatherapi.com/v1/forecast.json?key=42470ce511ef4c9786e151959252904&q=${location}&days=7`)
   let data = await response.json()
   displayTodayWeather(data)    
}
function displayTodayWeather(data){   
    console.log(data); 
    currentImg.setAttribute('src',data.current.condition.icon)
    temp.innerText = data.current.temp_c + '°'
    const date = new Date(data.current.last_updated);
    let dayName = days[date.getDay()]
    dayname.innerText = dayName + ' : ' + data.location.localtime.split(" ")[1];
    city.innerText = data.location.name
    country.innerText = data.location.country
    getCityImg(data.location.name)
    wind.innerText = data.current.wind_kph + ' km/h'
    windDir.innerText = data.current.wind_dir
    sunrise.innerText = data.forecast.forecastday[0].astro.sunrise
    sunset.innerText = data.forecast.forecastday[0].astro.sunset
    humidity.innerText = data.current.humidity + '%'
    uv.innerText = data.current.uv
    vis_km.innerText = data.current.vis_km + ' km'
    vis_miles.innerText = data.current. vis_miles + ' miles'
    max.innerText = data.forecast.forecastday[0].day.maxtemp_c + '°'
    min.innerText = data.forecast.forecastday[0].day.mintemp_c + '°'
    weatherDays.innerHTML = ''
    for( let i = 1 ; i < data.forecast.forecastday.length ; i++){
        console.log(); 
        weatherDays.innerHTML += `
        <div class="col-lg-2 col-md-4 col-6">
                          <div class="shadow inner bg-white py-2 px-3 text-center  custom-radius-left custom-radius-right">
                              <p class="mb-0">${days[new Date(data.forecast.forecastday[i].date).getDay()]}</p>
                              <img src="${data.forecast.forecastday[i].day.condition.icon}" alt="" class="w-100">
                              <p  class="mb-0">${Math.trunc(data.forecast.forecastday[i].day.maxtemp_c)}°-<span class="text-secondary">${Math.trunc(data.forecast.forecastday[i].day.mintemp_c)}°</span></p>
                              </div>
                      </div>
      ` 
    }

} 

 async function getCityImg(cityName) {
    let response = await fetch(`https://api.unsplash.com/search/photos?query=${cityName}&client_id=1izY2c-7eWsOlv3-s00POn0MznY8FXqHRZF1yRWnj5Y`)
    let data = await response.json()
    cityImg.setAttribute('src',data.results[0].urls.regular)
    
}
async function searchWeather(city) {
   let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=42470ce511ef4c9786e151959252904&q=${city}&days=7`) 
   let data = await response.json()
   displayTodayWeather(data)
}
// & Events
search.addEventListener('input',function(e){
 searchWeather(e.target.value);
})