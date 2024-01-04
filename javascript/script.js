const input = document.getElementById('input-busca');

const apiKey = '86e9cc080be88bbbfc2d7a140297efda';
const clientID = '4e0bd094fc1145488908caf7a167437b';
const clientSecret = "3dbfd8169f804a4fbd3a032e1fc81817";

function botaodebusca(){
    const inputValue = input.value;

    movimentoInput(inputValue);
}

function fecharinput(){
input.style.visibility = 'hidden';
input.style.width = '40px';
input.style.padding = '0.5rem 0.5rem 0.5rem 2.6rem';
input.style.transition = 'all 0.5s ease-in-out 0s';
input.value == "";
}

function abririnput(){
input.style.visibility = 'visible';
input.style.width = '300px';
input.style.padding = '0.5rem 0.5rem 0.5rem 3.1rem';
input.style.transition = 'all 0.5s ease-in-out 0s';
input.value == "";
input.style.margin = '0 auto'; // Centraliza o input horizontalmente
input.style.display = 'block'; // Necessário para a centralização funcionar
}

function mostrarEnvelope(){
    document.querySelector('#wrapper').style.visibility = 'visible';
    document.querySelector('#box').style.alignItems = 'center';
    document.querySelector('#procura').style.position = 'initial';
    document.querySelector('#procura').style.marginTop  = '30px';
    document.querySelector('#procura').style.marginBottom = '30px';
    document.querySelector('#container').style.position = 'relative';
}

function movimentoInput(inputValue){
    const visibility = input.style.visibility

    inputValue && procurarCidade(inputValue);

    visibility === 'hidden' ? abririnput() : fecharinput();
}
input.addEventListener('keyup',function(event){
    if(event.keyCode === 13){
        const valorInput = input.value;
        movimentoInput(valorInput)
    }
})
document.addEventListener('DOMContentLoaded', () =>{
    fecharinput();
    recarregarVideos()
});

async function procurarCidade(cidade){                         //  Usar async e await permite que você escreva código que “espera” que essas operações sejam concluídas antes de prosseguir. Isso pode ajudar a evitar erros que ocorreriam se o código tentasse usar os dados antes de estarem prontos.
    try{
        const dados = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${apiKey}&units=metric&lang=pt_br`)   // A função fetch é usada para fazer uma requisição HTTP para a API do OpenWeatherMap
        
        if(dados.status === 200){                       // Se o status da resposta for 200, significa que a requisição foi bem sucedida
        const resultado = await dados.json()            // O método json é usado para converter a resposta em um objeto JavaScript
        
        obterTopAlbunsPorPais(resultado.sys.country, true);
        mostrarClima(resultado);
        mostrarEnvelope();
        recarregarVideos();
        
          
        
    }else{
        throw new Error
    }
    }catch{                                             // Se ocorrer algum erro durante a execução do código acima, uma mensagem de erro é exibida
        alert('Erro na pesquisa da cidade!');
    }
}

function mostrarClima(resultado){
    document.querySelector('#icone-tempo').src =`./img/assets/${resultado.weather[0].icon}.png`    //atribui ao icone-tempo o resultado conforme o resultado atraves do resultado.weather[0].icon, que é um código de ícone fornecido pela API do OpenWeatherMap
    document.querySelector("#nome-cidade").innerHTML = `${resultado.name}`
    document.querySelector("#temperatura").innerHTML = `${resultado.main.temp.toFixed(0)}°C`
    document.querySelector("#max-temp").innerHTML = `Max ${resultado.main.temp_max.toFixed(0)}°C`
    document.querySelector("#min-temp").innerHTML = `Min ${resultado.main.temp_min.toFixed(0)}°C`
}
