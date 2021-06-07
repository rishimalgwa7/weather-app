const request = require("request");

const forecast = (lat,long,callback)=>{
    const url =
    "http://api.weatherstack.com/current?access_key=a1543f0c3ed86febd82da0fee848a1df&query="+lat+","+long;
  
  request({ url,json:true }, (error, {body}) => {
     if (error) {
        callback("Unable to connect to service", undefined);
     }else if(body.error){
        callback("Wrong Cordinates provided", undefined);
     } else {
      const current =body.current;
      callback(undefined,current.weather_descriptions[0]+" .Its feels like "+ current["feelslike"] +" but currently is "+current["temperature"] + " and humidity is "+ current["humidity"]);
     }
  });
  
}

module.exports = forecast;

