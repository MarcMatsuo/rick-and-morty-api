let api;
let pageAtual = 1;
const lastPage = 42;

async function buscaApi(pageAtual){
    const url = `https://rickandmortyapi.com/api/character/?page=${pageAtual}`;
    api = await fetch(url)
    .then(response => response.json())
}


function Character(name, species, status, location, img){
    this.name = name;
    this.species = species;
    this.status = status;
    this.location = location;
    this.img = img;
}


let characterList = [];
async function populaLista(){
    await buscaApi(pageAtual);

    characterList = []

    api.results.forEach(element => {
        let personagemAtual = new Character(element.name, element.species, element.status, element.location.name, element.image);
        characterList.push(personagemAtual);

    });
}

const characterListDOM = document.getElementById('character-list');
async function atualizaDom(){
    await populaLista();
    characterListDOM.innerHTML = ""

    characterList.forEach(element => {
        let li = document.createElement('li');
        li.innerHTML = 
        `<li class="character__item">
        <img class="character__image" src="${element.img}" alt="Image of ${element.name}">
        <div class="character__content">
            <p class="character__name">${element.name} <br><span class="character__species">${element.species}</span></p>
            <p class="character__status"><span class="character__icon ${element.status}"></span> ${element.status}</p>
            <p class="character__location">Last know location: <span>${element.location}</span></p>
        </div>
        </li>`

        characterListDOM.innerHTML += li.innerHTML
    })
}
atualizaDom()

const firstNumber = document.getElementById('pagination__first__number')
const midNumber = document.getElementById('pagination__mid__number')
const lastNumber = document.getElementById('pagination__last__number')
const firstPage = document.getElementById('pagination__first__page')
function paginationConstructor(){
    lastNumber.style.display = (pageAtual == lastPage) ? 'none' : 'block'

    firstNumber.style.backgroundColor = (pageAtual == 1) ? 'darkgray' : '';
    midNumber.style.backgroundColor = (pageAtual == 1) ? '' : 'darkgray';

    if (pageAtual != 1){
        firstNumber.innerHTML = parseInt(pageAtual, 10) - 1
        midNumber.innerHTML = pageAtual
        lastNumber.innerHTML = parseInt(pageAtual, 10) + 1
    } else{
        firstNumber.innerHTML = 1
        midNumber.innerHTML = 2
        lastNumber.innerHTML = 3
    }
}
paginationConstructor();


function paginationReloader(){
    document.querySelectorAll('.pagination__options').forEach(elemento => {
        elemento.addEventListener('click', event => {
            if(event.target.id == 'pagination__first__page'){
                pageAtual = 1
                paginationConstructor()
                atualizaDom(pageAtual)
                scrollIntoView()
                return;
            }

            if(event.target.id == "pagination__last__page"){
                pageAtual = 42
                paginationConstructor()
                atualizaDom(pageAtual)
                scrollIntoView()
                return;
            }

            if(event.target.id != 'pagination__mid__number' & pageAtual != 1){
                pageAtual = event.target.innerHTML
                paginationConstructor()
                atualizaDom(pageAtual)
                scrollIntoView()
            }else if(event.target.id != 'pagination__first__number' & pageAtual == 1){
                pageAtual = event.target.innerHTML
                paginationConstructor()
                atualizaDom(pageAtual)
                scrollIntoView()
            }
        })
    })
}
paginationReloader()

function scrollIntoView(){
    document.querySelector('header').scrollIntoView({behavior: "smooth"})
}