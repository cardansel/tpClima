window.addEventListener("load", () => {
  let lon;
  let lat;

  let ubicacion = document.querySelector("#ubicacion");
  const result=document.querySelector(".result");

  callAPI();
  
});

function callAPI()
{
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          lon = position.coords.longitude;
          lat = position.coords.latitude;
    
          const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,apparent_temperature,precipitation,windspeed_10m&timezone=America%2FSao_Paulo `;
    
          fetch(url)
            .then((data) => {
              return data.json();
            })
            .then((dataJSON) => {
              console.log(dataJSON);
              if (dataJSON.cod === "404") {
                showError("Ciudad no encontrada");
                return;
              }
              showWeather(dataJSON);
            });
        });
      }
}

function showWeather(data) 
{
const{longitude,latitude}=data;
const{temperature_2m,apparent_temperature,precipitation,windspeed_10m}=data.hourly;

data.hourly.time[0]=moment().format('MMMM Do YYYY, h:mm:ss a');
const hora=data.hourly.time[0]=moment().add(1, 'hours').format('MMMM Do YYYY, h:mm:ss a');

console.log(hora);

const content=document.createElement("div");
content.innerHTML=`
<div class="card">
<div class="card-body">
<h5 class="card-title">Coordenadas</h5>
<p class="card-text">Longitud: ${longitude}</p>
<p class="card-text">Latitud: ${latitude}</p>
<p class="card-text">Hora: ${hora}</p>
<p class="card-text">Temperatura: ${temperature_2m[0]}</p>
<p class="card-text">Temperatura: ${apparent_temperature[0]}</p>
<p class="card-text">Precipitaciones: ${precipitation[0]}</p>
<p class="card-text">Velocidad del Viento: ${windspeed_10m[0]}</p>
</div>
</div>
`;
result.appendChild(content);
}
