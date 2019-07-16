// Returns an integer, representing the hour in a Thh:mm:ssZ-format
const getHour = (time) => {
  return parseInt((time.length == 10) ? time[1] + time[2] : time[11] + time[12]);
}

const getWeatherData = () => {
  return fetch(API_ENDPOINT)
    .then((response) => {
      return response.json();
    })
    .then((responseJSON) => {
      const returnData = {
        "today": [],
        "tomorrow": []
      };

      // 2019-07-13T16:00:00Z
      const startDateTime = responseJSON.timeSeries[0].validTime
      const startDate = startDateTime.substring(0, 10);
      const startTime = startDateTime.substring(10);

      const dataPoints = [startDate + "T06:00:00Z",
      startDate + "T12:00:00Z",
      startDate + "T18:00:00Z"];

      // DATAPOINTS TODAY
      dataPoints.map((e) => {
        if (e < startDateTime) {
          returnData.today[e] = null;
        } else {
          returnData.today[e] = responseJSON.timeSeries[getHour(e) - getHour(startTime)];
        }
      });

      // DATAPOINTS TOMORROW
      for (let index = 0; index < 3; index++) {
        // Avståndet mellan midnatt idag och kl. 06:00 imorgon är 30h. Vi subtraherar timmarna 
        // passerade sedan dess, för att finna deras index. Därefter adderar vi multiplar av
        // sex för att stega oss igenom tiderna
        const dataIndex = 30 - getHour(startTime) + ((index) * 6);

        const weatherData = responseJSON.timeSeries[dataIndex];
        const dateTime = weatherData.validTime;

        returnData.tomorrow[dateTime] = weatherData;
      }
      return returnData;
    });
}


//const LON = 18.1489;
//const LAT = 57.3081;

//LÖTTORP
const LAT = 57.1660;
const LON = 16.9930;
const API_ENDPOINT = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${LON}/lat/${LAT}/data.json`;

export { getWeatherData };
