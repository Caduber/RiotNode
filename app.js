import fetch from 'node-fetch';

const key = "RGAPI-707b8865-f53e-4bef-83b6-d3e3483811ab";

const nome = "yon"
const tag = "3992"

async function getPuuid(nome, tag, key){

    const request = ("https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/" + nome + "/" + tag + "?api_key=" + key)

    const response = await fetch(request);
    const data = await response.json();
    
    //console.log(data.puuid)
    return data.puuid;
}

async function getMatchHist(puuid){

    const request = (`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${key}`);
    
    const response = await fetch(request);
    const partidas = await response.json();

    //const partida1 = partidas[2]
    return partidas;
}

async function getDados(partidas){

    //pega cada partida q ele recebeu por parametro
    for (let p = 0; p < partidas.length; p++) {

        const request = (`https://americas.api.riotgames.com/lol/match/v5/matches/${partidas[p]}?api_key=${key}`)

        const response = await fetch(request);
        const conteudo = await response.json();

        // pega o id do cara e joga os dados
        for (let i = 0; i < conteudo.metadata.participants.length; i++) {
        
            if (conteudo.metadata.participants[i] == await getPuuid(nome, tag, key)) {
                console.log("deu certo")
                console.log(conteudo.info.participants[i].spell1Casts)
                //console.log(conteudo.participants[i])
            }
        }
    }
    

    //return conteudo;
}


//console.log(await getPuuid(nome,tag,key))
const historico = await getMatchHist(await getPuuid(nome, tag, key))
//console.log(await getPartida(historico))
await getDados(historico);





//skill icons:     Home/latest/game/assets/characters/akshan/hud/icons2d