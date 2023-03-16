const maxPokemons = 149;
var pokedex = {};

$(document).ready(async function () {
    for (let i = 1; i <= maxPokemons; i++) {
        await getPokemon(i);
        let pokemon = $(`<div id="${i}" class="pokemon ${pokedex[i].types}">
            <img class="pokemon-img" src="${pokedex[i].img}">
            <div class="pokemon-number">#${String(i).padStart(Math.floor(Math.log10(maxPokemons)) + 1, '0')}</div>
            <div class="pokemon-name"><h2>${pokedex[i].name}</h2></div>
            <div class="pokemon-type">Type:${pokedex[i].types}</div>
        </div>`)

        openPokemon()
        $(".pokemon-list").append(pokemon);
    }

    $("#pokemon-description").text(pokedex[1]["desc"]);

});

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon.name;
    let pokemonType = pokemon.types[0].type.name;
    let pokemonImg = pokemon.sprites.front_default;
    let pokemonAbilities = pokemon.abilities.map(ability => ability.ability.name);
    let pokemonMoves = pokemon.moves.map(e => e.move.name);
    let pokemonHeight = pokemon.height;
    let pokemonStats = pokemon.stats.map(e => [e.base_stat, e.effort, e.stat.name])

    pokedex[num] = {
        "name": pokemonName, "img": pokemonImg,
        "types": pokemonType, "abilities": pokemonAbilities,
        "height": pokemonHeight, "moves": pokemonMoves, "stats": pokemonStats
    };

}

function openPokemon() {
    $('.pokemon').on('click', (e) => {

        const infoList = $('.modal-click') || '';
        infoList.remove(); 
           
        let pokemonCard = e.currentTarget
        i = pokemonCard.id

        for (const skills of pokedex[1].abilities) {
            var skill = skills
        }

        var html = `
        <div class="modal-click" style="display:flex;">
        <div class="blurbg"></div>
        <div class="pokemon-modal pokemon ${pokedex[i].types}">
                <img class="pokemon-img" src="${pokedex[i].img}">
                <div class="pokemon-name"><h2>${pokedex[i].name}</h2></div>
                <div class="pokemon-abilities">Abilities<div><span>${pokedex[i].abilities[0]}</span> <span>${pokedex[i].abilities[1] || pokedex[i].abilities[0]}</span></div></div>
                <div class="pokemon-number">#${String(i).padStart(Math.floor(Math.log10(maxPokemons)) + 1, '0')}</div>
                <div class="pokemon-height"><h4>Height: ${pokedex[i].height>10 ? pokedex[i].height/10 + 'm' : pokedex[i].height + '0cm'}</h4></div>
                <div class="pokemon-move"><span><b>Moves</b><div class="moves"><span>${pokedex[1].moves[0]}</span> <span>${pokedex[1].moves[1]}</span> <span>${pokedex[1].moves[2]}</span> <span>${pokedex[1].moves[3]}</span></span></div></div>
            </div>
        </div>
        `
        $(html).insertAfter('.pokemon-list')

        $('.modal-click .blurbg').on('click', function (e) {
            $('.modal-click').css('display', 'none')
        })
    })

}
