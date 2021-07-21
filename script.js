  document.querySelector('busca').addEventListener('submit', (event)=>{
      event.preventDefault()

      let input = document.querySelector('#searchInput').value 

      if(input !== ''){
            showWarning ('Carregando...')

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5538dcb2d5ce03d1cec2c16dc1f36f72&units=metric&lang=pt_br`
            let results = await fetch(url)
            let json = await results.json()

            if (json == 200) {
                showInfo({
                    name: json.name,
                    country: json.sys.country,
                    temp: json.main.temp,
                    tempIcon: json.weather[0].icon,
                    windSpeed: json.wind.windSpeed,
                    windAngle: json.wind.deg

                })
            } else {
                showWarning('Não foi possivel encontrar esta localização.')
            }
      }

  })

  function showWarning(msg) {
      document.querySelector('.aviso').innerHTML = msg
  }

  function showInfo(json) {
      showWarning('')

      document.querySelector('.resultado').getElementsByClassName.display = 'block'
      
  }