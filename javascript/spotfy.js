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


async function obterTopAlbunsPorPais(country){

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


function mostrarMusica(dados){                                      // A função 'mostrarMusica' é chamada com um parâmetro 'dados', que contém as informações das playlists.
    const liElement = ulElement.querySelectorAll('li');             // Aqui, 'liElement' é declarado dentro da função para garantir que ele sempre se refira aos elementos 'li' atuais no DOM.

    liElement.forEach((liElement, index)=> {                             // Este loop percorre cada elemento 'li'
        const imgElement = liElement.querySelector('img');               // Aqui, 'imgElement' e 'pElement' são referências para o elemento 'img' e 'p' dentro do atual elemento 'li'.
        const pElement = liElement.querySelector('p');
                                                                        // Aqui, a imagem e o texto do elemento 'li' são atualizados com as informações da playlist.
        imgElement.src = dados[index].image;
        pElement.textContent = dados[index].name;

        const novoLiElement = liElement.cloneNode(true);                // O antigo elemento 'li' é substituído pelo novo no DOM.
        liElement.parentNode.replaceChild(novoLiElement, liElement);

        novoLiElement.addEventListener('click', function() {             // Aqui, um novo event listener é adicionado ao novo elemento 'li'. Quando o elemento 'li' é clicado, ele abre a playlist no Spotify.
            window.open(`https://open.spotify.com/playlist/${dados[index].id}`, '_blank');
        });

    });
    

    document.querySelector('#playlist-caixa').style.visibility = 'visible';
}