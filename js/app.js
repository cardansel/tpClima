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
const{longitude,latitude,timezone,daily}=data;
const{temperature_2m,apparent_temperature,precipitation,windspeed_10m}=data.hourly;



//data.hourly.time=moment().format('MMMM Do YYYY, h:mm:ss a');
//let hora=data.hourly.time[0]=moment().add(1, 'hours').format('MMMM Do YYYY, h:mm:ss a');

//console.log(hora);

//data.hourly.time=moment().subtract(6, 'days').calendar();//

//console.log(data.hourly.time);

console.log(daily);
for (let i = 0; i < data.hourly.time.length; i++) {
  
  data.hourly.time[i]=moment().format('lll');
  console.log(data.hourly.time[i]);
    
}
//format hora
var horalocal=new Date();
horalocal=moment().format('lll');
console.log(horalocal);
var hora=data.hourly.time[0];
if(hora==horalocal)
{
  console.log(hora,horalocal);
  return true;
  
}else{
  return false;
}





const content=document.createElement("div");
content.innerHTML=`
<div class="card">
<div class="card-body">

<p class="card-text">${hora}</p>
<p class="card-text">${daily}</p>

</div>
</div>
`;
result.appendChild(content);


}
