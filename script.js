/*
Mostrar los personajes sin filtrar
Obtener personajes llamados a la api
Renderizar en el DOM
Cambio de filtros al hacer un llamado a la api
Renderizar nuevamente
*/

const charactersEl = document.getElementById('characters');
const nameFilterEl = document.getElementById('name-filter');
const statusFilterEl = document.getElementById('status-filter');

//Crear funcion que llame a la api

async function getCharacters (name, status){
    
    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status){
        url += '?';
        if(name){
            url += `name=${name}&`;
        }

        if(status){
            url += `status=${status}`
        }
    }
    
    const response = await fetch(url);
    const data = await response.json();

    console.log(data.results);
    
    return data.results;
}

//Renderizar elementos en el DOM

async function displayCharacters (name, status) {

    //Obtener los personajes filtrados
    const characters = await getCharacters(name, status);

    charactersEl.innerHTML = '';

    //renderizar personajes
    for( let character of characters ){
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML =`
            <img src="${character.image}"/>
            <h2> ${character.name} </h2>
            <p> Status: ${character.status} </p>
            <p> Species: ${character.species} </p>
            <p> Gender: ${character.gender} </p>
        `;

        charactersEl.appendChild(card);
    }
}

displayCharacters();

nameFilterEl.addEventListener('input', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value)
});

statusFilterEl.addEventListener('change', () => {
    displayCharacters(nameFilterEl.value, statusFilterEl.value)
});