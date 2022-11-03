window.addEventListener('load',(e)=>{
    e.preventDefault();
    const appId="b3a88427ff1c9467cff0effc0417ecf2";
    const url =
  "https://api.open-meteo.com/v1/forecast?latitude=-54.82&longitude=-68.36&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo ";

    fetch(url)
    .then(data=>{
        return data.json();
    })
    .then(dataJSON=>{
        console.log(dataJSON);
        if(dataJSON.cod==="404"){
            showError("Ciudad no encontrada");
            return;
        }
        showWeather(dataJSON);
    })
})