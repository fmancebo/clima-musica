async function obterAcessoToken(){
    const credentials = `${clientID}:${clientSecret}`;
    const encodedCredentials = btoa(credentials);

    const response = await fetch('https://accounts.spotify.com/api/token',{
        method: 'POST',
        headers:{
            'Authorization': `Basic ${encodedCredentials}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
    });
    const data = await response.json()
    return data.access_token;
    
}
function obterDataAtual(){
    const currentDate = new Date();
    const ano = currentDate.getFullYear();
    const mes = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const dia = currentDate.getDate().toString().padStart(2,'0');

    return `${ano}-${mes}-${dia}`;
}


async function obterTopAlbunsPorPais(country, forceUpdate = false){
    // Se forceUpdate for true, ignore o cache e busque os dados mais recentes
    if (forceUpdate){
        // Se forceUpdate for true, limpe o cache
    }
    try{
        const accessToken = await obterAcessoToken();
        const dataAtual = obterDataAtual();
        const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&timestamp=${dataAtual}T09%3A00%3A00&offset=0&limit=3&cache_bust=true`
        const resultado = await fetch(`${url}`,{
            headers:{
                'Authorization': `Bearer ${accessToken}`
            },
        });
        if(resultado.status === 200){
            const data = await resultado.json()
            const result = data.playlists.items.map(item =>({
                name: item.name,
                image: item.images[0].url,
                id: item.id
            }));
        
            mostrarMusica(result);
        }else{
            throw new Error
        }
    }
    catch{
        alert('A pesquisa por musica deu errado!')
    }
}
const ulElement = document.querySelector('#playlist-caixa');
const liElement = ulElement.querySelectorAll('li');

function mostrarMusica(dados){
    liElement.forEach((liElement, index)=> {
        const imgElement = liElement.querySelector('img');
        const pElement = liElement.querySelector('p');

        imgElement.src = dados[index].image;
        pElement.textContent = dados[index].name;

        liElement.addEventListener('click', function() {
        window.open(`https://open.spotify.com/playlist/${dados[index].id}`, '_blank');
        });

    });

    document.querySelector('#playlist-caixa').style.visibility = 'visible';
}