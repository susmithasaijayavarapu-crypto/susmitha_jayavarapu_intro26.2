const baseurl = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41"

const weatherDescription = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Light drizzle",
    61: "Rain: Slight",
    63: "Rain: Moderate",
    71: "Snow fall: Slight",
    80: "Rain showers: Slight",
    95: "Thunderstorm: Slight or moderate"
    
};

async function fetchData(type){
    
    const display = document.getElementById("result");
    display.innerText = "Fetching fresh data...";
    let url ="";
    if(type == "temperature")
    {
        url = `${baseurl}&current=temperature_2m`;
    }
    else{
        url = `${baseurl}&current=weather_code`;
    }
    try{
        const response = await fetch(url);
        const data = await response.json();

        if(type == "temperature")
        {
            display.innerText = `current Temperature : ${data.current.temperature_2m} °C`;
        }
        else {
            const code = data.current.weather_code;
            const description = weatherDescription[code] || "Unknown Condition";
             display.innerText = `current Weather : ${description} `;
        }
       
    }
    catch(error)
    {
        display.innerText = "Trouble fetching data";
    }



}