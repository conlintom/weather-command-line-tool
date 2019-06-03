const axios = require('axios');

module.exports.readByCoordinates = function(lat, lon) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.weather.gov/points/${lat},${lon}/forecast`)
            .then( res => {
                resolve(res.data.properties.periods);
                console.log("success");
            })
            .catch(err => {
                reject(new Error(err.response.data['detail']));
                console.log("error!!!");
            });
    });
};