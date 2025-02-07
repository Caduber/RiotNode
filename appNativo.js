const key = "RGAPI-707b8865-f53e-4bef-83b6-d3e3483811ab";

async function getPuuid(nome, tag, key){

    const request = ("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + nome + "/" + tag + "?api_key=" + key)

    const response = await fetch(request, { method: 'GET' });
    const conta = await response.json();

    //console.log(conta.puuid);
    return conta.puuid;
}

async function getMatchHist(puuid){

    const request = (`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${key}`);
    
    fetch(request, {
        method : "GET"
    }).then(response =>response.json())
    .then(historico =>{
        return historico;
    }) 
}

function getDados(partidas, puuid){

    //pega cada partida q ele recebeu por parametro
    for (let p = 0; p < partidas.length; p++) {

        const request = (`https://americas.api.riotgames.com/lol/match/v5/matches/${partidas[p]}?api_key=${key}`)

        fetch(request, {
            method : "GET"
        }).then(response =>response.json())
        .then(conteudo =>{

            // pega o id do cara e joga os dados
            for (let i = 0; i < conteudo.metadata.participants.length; i++) {
            
                if (conteudo.metadata.participants[i] == puuid(nome, tag, key)) {
                    console.log("deu certo")
                    console.log(conteudo.info.participants[i].spell1Casts)
                    //console.log(conteudo.participants[i])
                }
            }
        }) 

        
    }
}

const nome = "yon"
const tag = "3992"
const puuid = await getPuuid(nome, tag, key)

console.log(puuid)

//getDados(getMatchHist(puuid), puuid)
