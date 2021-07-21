document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault()
    const input = document.querySelector('#searchInput').nodeValue

    if(input !== ''){
        clearInfo()
        showWarning('Carregando...') 
            
        const apikey = '5538dcb2d5ce03d1cec2c16dc1f36f72'
        const units = 'metric'
        const lang = 'pt_br'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(city)}&appid=${apikey}&units=${units}&lang=${lang}`   
        const result = await fetch(url)
        const item = await result.json()
            
        if(item.cod === 200){
        showInfo({
            name: item.name,
            country: item.sys.country,
            temp: item.main.temp,
            tempIcon: item.weather[0].icon,
            windSpeed: item.wind.speed,
            windAngle: item.wind.deg
        })
        } else {
            clearInfo()
            showWarning('Localização não encontrada. Tente novamente!')
        }
    }  
})
  
  function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
  }
  
  function showInfo(obj){
    showWarning('')
    document.querySelector('.titulo').innerHTML = `${obj.name}, ${obj.country}`
    document.querySelector('.tempInfo').innerHTML = `${obj.temp} <sup>ºC</sup>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${obj.temp_icon}@2x.png`)
    document.querySelector('.ventoInfo').innerHTML = `${obj.windSpeed} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${obj.windDirection - 90}deg)`
    document.querySelector('.resultado').style.display = 'block'
  }
  
  function clearInfo(){
    document.querySelector('.resultado').style.display = 'none'
  }

  