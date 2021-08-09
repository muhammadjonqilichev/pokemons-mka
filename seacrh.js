let elForm = MakeElem('#form')
let movieList = MakeElem('.movie__list')
let movieGenreList = MakeElem('.movie__genre-list')
let movieGenre = MakeElem('.movie__genre')
let movieSearch = MakeElem('.movie__search')



function renderGenresSelect(pokemons, element) {
    const result = []
    pokemons.forEach(pokem => {
        pokem.type.forEach(genre => {
            if (!result.includes(genre)) {
                result.push(genre)
            }
        })
    })

    result.forEach(genre => {
        const newOption = CreateDom('option')
        newOption.value = genre;
        newOption.textContent = genre

        element.appendChild(newOption)
    })
}

renderGenresSelect(pokemons, movieGenre)



function render(arrFilm, element) {

    element.innerHTML = null
    arrFilm.forEach(pokem => {

        //creating elements
        let newLi = CreateDom('li')
        let newImg = CreateDom('img')
        let newHeading = CreateDom('h2')
        let newTime = CreateDom('time')
        let newGenreLi = CreateDom('p')
        let newBlock = CreateDom('div')
        let newWeight = CreateDom('p')
        let newAge = CreateDom('p')


        //creating attributes 
        newLi.setAttribute('class', 'movie__item')
        newImg.setAttribute('src', pokem.img)
        newImg.setAttribute('width', '150')
        newImg.setAttribute('height', '200')
        newHeading.setAttribute('class', 'movie__item-title')
        newGenreLi.setAttribute('class', 'movie__genre')
        newBlock.setAttribute('style', 'display:flex; justify-content:space-between')

        //elements content
        newHeading.textContent = pokem.name
        newGenreLi.textContent = pokem.type
        newWeight.textContent = pokem.weight
        newAge.textContent = pokem.candy_count + 'cc'

        //appendChilds
        newLi.appendChild(newImg)
        newLi.appendChild(newHeading)
        newLi.appendChild(newGenreLi)
        newBlock.appendChild(newWeight)
        newBlock.appendChild(newAge)
        newLi.appendChild(newBlock)
        movieList.appendChild(newLi)
    });
}

render(pokemons, movieList)


elForm.addEventListener('submit', (e) => {
    e.preventDefault()

    let selectGenres = movieGenre.value.trim()
    let searchFilms = movieSearch.value.trim()
    let regex = RegExp(searchFilms, 'gi')


    let searchedFilms = pokemons.filter((pokem) => {
        return pokem.name.match(regex)
    })



    let foundFilms = []

    if (selectGenres == 'All') {
        foundFilms = searchedFilms
    } else {
        foundFilms = searchedFilms.filter(pokem => {
            return pokem.type.includes(selectGenres)
        })
    }
    render(foundFilms, movieList)
})
