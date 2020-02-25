
// When out page loads, this function will run
//arrow function
window.addEventListener('load', () => {
  let lat;
  let long;

  let temperatureDescription = document.querySelector('.temperature-description');
  let locationTimezone = document.querySelector('.location-timezone');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let temperatureSection = document.querySelector('.temperature')
  const temperatureSpan = document.querySelector('.temperature span')
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
          const {temperature, summary, icon } = data.currently;
          //Set dom elements from the api
          temperatureDegree.textContent = temperature;
          temperatureDescription.textContent = summary;
          locationTimezone.textContent = data.timezone;

          // set icon
          setIcons(icon, document.querySelector('.icon'));

          //Change F to C
          temperatureSection.addEventListener('click', () =>{
            //on click
            if(temperatureSpan.textContent === "F"){
              temperatureSpan.textContent = 'C';
              f_to_c = (temperature - 32)*(5/9)
              temperatureDegree.textContent = Math.round((f_to_c + Number.EPSILON) * 100) / 100

            } else {
              temperatureSpan.textContent = 'F';
              temperatureDegree.textContent = temperature;
            }
          });
        });
        // if fetch works properly
    });
  } else {
    window.alert("Browser not supported or something wrong with location share");
  }

  //function for icon depending on Weather
  function setIcons(icon, iconID){
    const skycons = new Skycons({color: "white"});
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
  }

});
