document.querySelector('.busca').addEventListener('submit', async (event)=> {
    event.preventDefault();

    let input = document.querySelector('#searchInput').nodeValue;

    if(input !== '') {
        clearInfo();

        showWarning('Carregando...');

        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5538dcb2d5ce03d1cec2c16dc1f36f72&units=metric&lang=pt_br`
        
        let result = await fetch(url);
        let json = await result.json();
    
        if(json.cod === 200) {
            sohwInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        } else {
            clearInfo();
            showWarning('Não encontramos essa localização.');
        }
    } else {
        clearInfo();
    }
});


function sohwInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${Math.round(json.temp)} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${Math.round(json.windSpeed)} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle - 90}deg);`

    document.querySelector('.resultado').style.display = 'block';

}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}
