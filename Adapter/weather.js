const axios = require('axios');

module.exports.readByCoordinates = function(lat, lon) {
    return new Promise((resolve, reject) => {
        axios.get(`https://api.weather.gov/points/${lat},${lon}/forecast`)
            .then( res => {
                resolve(res.data.properties.periods);
            })
            .catch(err => {
                reject(new Error(err.response.data['detail']));
            });
    });
};