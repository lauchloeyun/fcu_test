const axios = require('axios');

const clientId = 'HSPCDQPLKF41ZGFIL2KFA4KKNGSG4AABNWLD5LNXK2CIAL2B';
const clientSecret = 'PTHU2DRS0JURH33KXAM1M3NY0WGNP2EPJWOMFUYRQWKNSEPH';
const searchQuery = '逢甲大學';

const currentDate = new Date().toISOString().slice(0, 7).replace(/-/g, '');

const apiUrl = `https://api.foursquare.com/v2/venues/search?client_id=${clientId}&client_secret=${clientSecret}&v=${currentDate}-&near=${searchQuery}`;

axios.get(apiUrl)
  .then(response => response.data)
  .then(data => {
    const venueId = data.response.venues[0].id;
    const venueUrl = `https://api.foursquare.com/v2/venues/${venueId}?client_id=${clientId}&client_secret=${clientSecret}&v=${currentDate}`;

    axios.get(venueUrl)
      .then(response => response.data)
      .then(data => {
        const venue = data.response.venue;
        const name = venue.name;
        const category = venue.categories[0].name;
        const location = venue.location;
        const openingHours = venue.hours;

        console.log('地點名稱:', name);
        console.log('地點類別:', category);
        console.log('經度:', location.lat);
        console.log('緯度:', location.lng);
        console.log('營業時間:', openingHours);
      });
  })
  .catch(error => {
    console.log('發生錯誤:', error);
  });
