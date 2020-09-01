/* Note: I used information from 
https://developers.google.com/web/fundamentals/native-hardware/user-location 
to help implement the geolocation methods
*/

window.onload = function() {
    var startPos;
    var geoOptions = {
        maximumAge : 5 * 3.6 * 1000000, // caches position for 5 hours (in milliseconds) 
        timeout: 10 * 1000
    }

    var geoSuccess = function(position) {
        startPos = position;
        var lat = startPos.coords.latitude;
        var lon = startPos.coords.longitude;
        console.log(lat);
        console.log(lon);
  
        /* building the url */
        var base_url = 'http://api.aladhan.com/v1/timings/';
        var time_stamp = Math.round((new Date()).getTime() / 1000);
        var url = base_url + time_stamp + '?latitude=' + lat + 
        '&longitude=' + lon +'&school=1';

        console.log(url);
        /* getting the data from the API */
        getData(url);
    };
    var geoError = function(error) {
        console.log('Error occurred. Error code: ' + error.code);
    };
  
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

  };

  /* uses fetch() to retrieve JSON object */

function getData(url) {
    console.log("fetching data!");
    fetch(url)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(text => {
            console.log(text);
            appendData(text.data.timings);
        })
        .catch(error => {
            console.log(error);
        });
}

/* appends data to the HTML file */
function appendData(data) {
    console.log(data);
    document.getElementById("Fajr").innerHTML += data.Fajr;
    document.getElementById("Dhuhr").innerHTML += data.Dhuhr;
    document.getElementById("Asr").innerHTML += data.Asr;
    document.getElementById("Maghrib").innerHTML += data.Maghrib;
    document.getElementById("Isha").innerHTML += data.Isha;
}
