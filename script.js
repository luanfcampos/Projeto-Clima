document.querySelector('.busca').addEventListener('submit', async (event) =>{
    //prevene que a pag seja atualizada ao envir o form
    event.preventDefault() 

    let input = document.querySelector('#searchInput').value

    if(input !== ''){
        clearInfo()
        showWarning('Carregando')
        
        const key = '5538dcb2d5ce03d1cec2c16dc1f36f72'

        //Requisição dos dados
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=${key}&units=metric&lang=pt_br`

        const results = await fetch(url)
        const json = await results.json()

        //Verificação se a cidade foi encontrada
        if(json.cod ===200){
            showInfo({
            name: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            windAngle: json.wind.deg
            })
        }else{
            clearInfo()
            showWarning('Não encontramos esta cidade. Tente novamente')
        }
    }else{
        clearInfo()
    }
})

//apresenta os dados na tela
function showInfo(json){
    showWarning('')

    
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${Math.round(json.temp)} <sup>ºC</sup>`
    document.querySelector('.ventoInfo').innerHTML = `${Math.round(json.windSpeed)} <span>km/h</span>`
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`) //troca o icone

    document.querySelector('.resultado').style.display = 'block' //mostra os elementos na tela
}

//limpa a layout 
function clearInfo(){
    showWarning('')
    document.querySelector('.resultado').style.display = 'none'
}

//aviso
function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg
}