// const axios = require('axios') NOT NEEDED I GUESS

// Button is clicked. 
// Request data for a single random pokemon
function getPokemonData(){
    return new Promise((res, rej) =>{
        getMon(()=>{
            res(args);
        })
        // disable button once all 6 sprites have appeared
        document.getElementById("request-btn").disabled = true
    })
}

// request data for 5 other pokemon that share a type with the random pokemon.
// display pictures of all 6 pokemon on the screen
const getMon = async ()=>{
    // randomly choose one initial pokemon
    let typeChoice = Math.floor(Math.random() * 898)
    //console.log(typeChoice)

    // get the URL of all the types and choose one
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon/" + typeChoice + "/")
    //console.log(response)

    // get first pokemon's name to save it
    const firstPokeName = response.data.name
    //console.log(firstPokeName)
    

    // get the url of the type
    const typeUrl = response.data.types[0].type.url
	//console.log(typeUrl)
    let pokemonType = response.data.types[0].type.name
    //console.log(pokemonType)
    let typePrint = document.createElement("p")
    typePrint.innerHTML = pokemonType
    document.getElementById("img-container").appendChild(typePrint)


    // save the first sprite to the webpage
    let firstSpriteUrl = response.data.sprites.front_default
    let newSprite = document.createElement("img")
    newSprite.src = firstSpriteUrl
    // append it to the div img-container
    document.getElementById("img-container").appendChild(newSprite)

	
    // visit the URL to see ALL pokemon of that type
    const typeResponse = await axios.get(typeUrl)
    // console.log(typeUrl)
    // console.log(typeResponse)
    const max = typeResponse.data.pokemon.length
    //console.log("Max: " + max)

    // save pokemon names of whom sprites have been found
    let alreadyRequested = [firstPokeName]
    let randInt = Math.floor(Math.random() * max + 1)
    // request data for 5 more pokemon
    for(let i = 0; i < 5; ++i){
        // get data on a random pokemon
        let nextPokemon = typeResponse.data.pokemon[randInt].pokemon
        //console.log(nextPokemon)
        //console.log(nextPokemon.name)

        // create a random number
        while(alreadyRequested.includes(nextPokemon.name)){
            randInt = Math.floor(Math.random() * max + 1)
            nextPokemon = typeResponse.data.pokemon[randInt].pokemon
        }
        alreadyRequested.push(nextPokemon.name)
        
        // get the URL to the pokemon's page
        let pokeUrl = nextPokemon.url
        
        // get the sprite src URL
        let spriteResponse = await axios.get(pokeUrl)
        //console.log(spriteResponse)

        // get the sprite
        let spriteSrc = spriteResponse.data.sprites.front_default

        // create a new image element with src= pokemon sprite
        let newSprite = document.createElement("img")
        if(spriteSrc){
            newSprite.src = spriteSrc
            // append it to the div img-container
            document.getElementById("img-container").appendChild(newSprite)
        }else{
            // spriteSrc is null for some reason
            i -= 1
        }
        
    }

}