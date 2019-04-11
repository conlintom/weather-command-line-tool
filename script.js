

var request = new XMLHttpRequest(); 

request.open("GET", "https://api.weather.gov/alerts/active/region/AL", true);

request.send();

(request.onload = function() {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400){
        
    }
    console.log(data);
});