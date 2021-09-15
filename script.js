document.querySelector(`.search`).addEventListener(`submit`, async (event) => {
  event.preventDefault();

  let input = document.querySelector(`#searchInput`).value;

  if (input !== ``) {
    showWarning(`Loading...`);
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=061285ff505e47615f2ae601de75fce1&units=metric`;
    let result = await fetch(url);
    let json = await result.json();

    console.log(json);

    if (json.cod === 200) {
      clearInfo();
      showInfo({
        name: json.name,
        country: json.sys.country,
        temp: json.main.temp,
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      clearInfo();
      showWarning(`Not found`);
    }
  }
});

function showInfo(json) {
  showWarning(``);

  document.querySelector(`.title`).innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(`.tempInfo`).innerHTML = `${json.temp}<sup>ºC</sup>`;
  document.querySelector(
    `.windInfo`
  ).innerHTML = `${json.windSpeed}<span>km</span>`;
  document
    .querySelector(`.temp img`)
    .setAttribute(
      `src`,
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
  document.querySelector(`.windPoint`).style.transform = `rotate(${
    json.windAngle - 90
  }deg)`;
  document.querySelector(`.result`).style.display = `block`;
}

function clearInfo() {
  document.querySelector(`.result`).style.display = `none`;
}

function showWarning(msg) {
  document.querySelector(`.warning`).innerHTML = msg;
}
