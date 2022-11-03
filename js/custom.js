const result=document.querySelector("#result"); 
const form=document.querySelector("#form");
const nameCity=document.querySelector("#city");
const nameCountry=document.querySelector("#country");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if(nameCity==='' || nameCountry===''){
        showError('Ambos campos son obligatorios');
        return;
    }
    callAPI(nameCity.value, nameCountry.value);
  
 
})

function callAPI(city, country){
    const appId="b3a88427ff1c9467cff0effc0417ecf2";
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${appId}`;
    
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
}

function showError(message){
    console.log(message);
    const alert=document.createElement("p");
    alert.classList.add("alert-messege");
    alert.innerHTML=message;

    form.appendChild(alert);
    setTimeout(()=>{
        alert.remove();
    },3000);
}
