const http = require('http');
const citybikeurl = "http://api.citybik.es/v2/networks/decobike-miami-beach"

const getCityBikeData = () => {
    return new  Promise((resolve, reject)=> {
        http.get(citybikeurl, res => {
            let data = [];
            const headerDate = res.headers && res.headers.date ? res.headers.date : 'no response date';
            console.log('Status Code:', res.statusCode);
            console.log('Date in Response header:', headerDate);
          
            res.on('data', chunk => {
              data.push(chunk);
            });
          
            res.on('end', () => {
              const cityBike = JSON.parse(Buffer.concat(data).toString());
              resolve(cityBike);  
            });
          }).on('error', err => {
            console.log('Error: ', err.message);
            reject(err)
          });
    })
}

module.exports = {
    getCityBikeData,
}