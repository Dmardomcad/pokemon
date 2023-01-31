import pokemonAPI from "../api/pokemonApi"

const getPokemonOptions = () =>{
    let arr = []
    while(arr.length<4){
        let num = Math.floor(Math.random()*651)
        if (!arr.includes(num)){
            arr.push(num)
        }
    }
    return arr
}

const getPokemonNames = async ([p1,p2,p3,p4]) =>{
    // meter aqui las llamadas en array y usar promise all
    const promiseArr = [
        pokemonAPI.get(`/${p1}`),
        pokemonAPI.get(`/${p2}`),
        pokemonAPI.get(`/${p3}`),
        pokemonAPI.get(`/${p4}`)
    ]

    
    const [pokemon1,pokemon2,pokemon3,pokemon4] = await Promise.all(promiseArr)
    return [
        {
            name:pokemon1.data.name ,
            id: pokemon1.data.id
        },
        {
            name:pokemon2.data.name ,
            id: pokemon2.data.id
        },
        {
            name:pokemon3.data.name ,
            id: pokemon3.data.id
        },
        {
            name:pokemon4.data.name ,
            id: pokemon4.data.id
        },
    ]
}

export default getPokemonOptions