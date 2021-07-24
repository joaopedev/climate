document.querySelector(`.busca`).addEventListener(`submit`, async (event)=>{
event.preventDefault();

let input = document.querySelector(`#searchInput`).value;

if(input !== ``){
    showWarning(`Loading...`);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=061285ff505e47615f2ae601de75fce1&units=metric`;
    let result = await fetch(url);
    let json = await result.json();
    
    console.log(json);

    if(json.cod === 200){
        clearInfo()
        showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
        });
    } else {
        clearInfo()
        showWarning(`Not found`);
    } else {
        clearInfo();
    }

}

})

function showInfo(json){
    showWarning(``);
    document.querySelector(`.resultado`).style.display = `block`;
    document.querySelector(`.titulo`).innerHTML = `${json.name}, ${json.country}`
    document.querySelector(`.tempInfo`).innerHTML = `${json.temp}<sup>ºC</sup>`
    document.querySelector(`.ventoInfo`).innerHTML = `${json.windSpeed}<span>km</span>`
    document.querySelector(`.temp img`).setAttribute(`src`, `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector(`.ventoPonto`).style.transform = `rotate(${json.windAngle-90}deg)`
}

function clearInfo(){
    document.querySelector(`.resultado`).style.display = `none`;
}

function showWarning(msg){
    document.querySelector(`.aviso`).innerHTML = msg;
}