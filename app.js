
// When out page loads, this function will run
//arrow function
window.addEventListener('load', () => {
  let lat;
  let long;

  let temperatureDescription = document.querySelector('.temperature-description');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureDegree = document.querySelector('.temperature-degree');

  //allow user to share location, if shared
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position) //user position data
      //user gets share location notification here
      lat = position.coords.latitude;
      long = position.coords.longitude;
      const proxy =  "https://cors-anywhere.herokuapp.com/";
      const api = `${proxy}https://api.darksky.net/forecast/5a4e322999cf772137290535d1dc0508/${lat},${long}`;

      // cors issue
      fetch(api)
        .then(response => {
          // we need to convert to json to work with js
          return response.json();
        })
        .then(data => {
          console.log(data);
          const {temperature, summary } = data.currently;
          //Set dom elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;
        });
        // if fetch works properly
    });
  } else {
    window.alert("Browser not supported or something wrong with location share");
  }
});
