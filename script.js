document.querySelector(`.busca`).addEventListener(`submit`, async (event)=>{
event.preventDefault();

let input = document.querySelector(`#searchInput`).value;
console.log(input);

if(input !== ``){
    showWarning(`Carregando...`);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=061285ff505e47615f2ae601de75fce1&units=metric&lang=pt_br
    `;
    let result = await fetch(url);
    let json = await result.json();
    console.log(json);

}

})

function showWarning(msg){
    document.querySelector(`.aviso`).innerHTML = msg;
}