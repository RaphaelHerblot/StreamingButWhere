/* 
Attendre le chargement du DOM
*/
document.addEventListener('DOMContentLoaded', () => {

    /* 
    Déclarations
    */
        const searchForm = document.querySelector('header form#searchForm');
        const searchLabel = document.querySelector('header form#searchForm span');
        const searchData = document.querySelector('[name="searchData"]');
        const themoviedbUrl = 'https://api.themoviedb.org/3/search/movie?api_key=6fd32a8aef5f85cabc50cbec6a47f92f&query=';
        const movieList = document.querySelector('#movieList');
        const moviePopin = document.querySelector('#moviePopin article');
    //

    /* 
    Fonctions
    */
        const getSearchSumbit = () => {
            searchForm.addEventListener('submit', event => {
                // Stop event propagation
                event.preventDefault();

                // Check form data
                searchData.value.length > 0 
                ? fetchFunction(searchData.value) 
                : displayError(searchData, 'Minimum 1 caractère');
            });
        };

        const displayError = (tag, msg) => {
            searchLabel.textContent = msg;
            tag.addEventListener('focus', () => searchLabel.textContent = '');
        };

        const fetchFunction = (keywords, index = 1) => {
            
            let fetchUrl = null;

            typeof keywords === 'number' 
            ? fetchUrl = `https://api.themoviedb.org/3/movie/${keywords}?api_key=6fd32a8aef5f85cabc50cbec6a47f92f`
            : fetchUrl = themoviedbUrl + keywords + '&page=' + index


            fetch( fetchUrl )
            .then( response => response.ok ? response.json() : 'Response not OK' )
            .then( jsonData => {
                typeof keywords === 'number' 
                ? displayPopin(jsonData)
                : displayMovieList(jsonData.results)
            })
            .catch( err => console.error(err) );
        };

        const displayMovieList = collection => {
            searchData.value = '';
            movieList.innerHTML = '';

            console.log(collection)
            for( let i = 0; i < collection.length; i++ ){
                if(collection[i].poster_path != null) {
                    movieList.innerHTML += `
                        <article>
                            <figure>
                                <img src="https://image.tmdb.org/t/p/w500/${collection[i].poster_path}" alt="${collection[i].original_title}">
                                <figcaption movie-id="${collection[i].id}">
                                    ${collection[i].original_title} (voir plus...)
                                </figcaption>
                            </figure>
                            <div class="overview">
                                <div>
                                    <p>${collection[i].overview}</p>
                                    <button>Voir le film</button>
                                </div>
                            </div>
                        </article>
                    `;
                }
                else {
                    movieList.innerHTML += `
                    <article>
                        <figure>
                            <img src="./img/alex_default.jpg" class="alex" alt="No image">
                            <figcaption movie-id="${collection[i].id}">
                                ${collection[i].original_title} (voir plus...)
                            </figcaption>
                        </figure>
                        <div class="overview">
                            <div>
                                <p>${collection[i].overview}</p>
                                <button>Voir le film</button>
                            </div>
                        </div>
                    </article>
                    `;
                }
            };

            getPopinLink( document.querySelectorAll('figcaption') );
        };

        const getPopinLink = linkCollection => {
            for( let link of linkCollection ){
                link.addEventListener('click', () => {
                    // +var = parseInt(var) || parseFloat(var)
                    fetchFunction( +link.getAttribute('movie-id') );
                });
            };
        };

        const displayPopin = data => {
            console.log(data);
            if(data.poster_path != null) {
                moviePopin.innerHTML = `
                    <div>
                        <img src="https://image.tmdb.org/t/p/w500/${data.poster_path}" alt="${data.original_title}">
                    </div>

                    <div>
                        <h2>${data.original_title}</h2>
                        <p>${data.overview}</p>
                        <button>Voir en streaming</button>
                        <button class="addFilm" film-id=${data.id} film-title="${data.original_title}">Ajouter en favori</button>
                        <button id="closeButton">Close</button>
                    </div>
                `;
            }
            else {
                moviePopin.innerHTML = `
                <div>
                    <img src="./img/alex_default.jpg" alt="No image">
                </div>

                <div>
                    <h2>${data.original_title}</h2>
                    <p>${data.overview}</p>
                    <button>Voir en streaming</button>
                    <button class="addFilm" film-id=${data.id} film-title="${data.original_title}">Ajouter en favori</button>
                    <button id="closeButton">Close</button>
                </div>
                 `;
            }

            moviePopin.parentElement.classList.add('open');
            closePopin( document.querySelector('#closeButton') )
            addFavori(document.querySelectorAll('.addFilm'));
            closePopin(document.querySelector('.addFilm'))
        };

        const closePopin = button => {
            button.addEventListener('click', () => {
                button.parentElement.parentElement.parentElement.classList.add('close');
                setTimeout( () => {
                    button.parentElement.parentElement.parentElement.classList.remove('open');
                    button.parentElement.parentElement.parentElement.classList.remove('close');
                }, 300 )
            })
        }

        const addFavori = (btnList) => {
            let filmToAdd = {};
            let config = {};
            let authorValue = localStorage.getItem("user");
            let idFilmValue = null;
            let nameFilmValue = null;

            for(let btn of btnList){
                btn.addEventListener('click', ()=>{
                     let favorite = document.querySelector('#favoriteParagraph');
                    idFilmValue = btn.getAttribute('film-id');
                    nameFilmValue = btn.getAttribute('film-title')
                    filmToAdd = {
                        author: authorValue,
                        id: idFilmValue,
                        title: nameFilmValue
                    }
                    config = {
                        method: 'POST',
                        body: JSON.stringify(filmToAdd),
                        headers: { 'Content-Type': 'application/json' }
                    }
                    if(authorValue !== null){
                      fetchFavorite(config);
                        favorite.innerHTML += `<span movie-id="${idFilmValue}" fav-id="${idFilmValue}">${nameFilmValue}. <input type="button" value="X" class="deleting"></span> `;

                    }else{
                        console.log('merci de vous connecter')
                    }
                })
            }
        }

        const fetchFavorite = (fetchData) => {
            fetch('https://api.dwsapp.io/api/favorite', fetchData)
            .then(response => {
                return response.json(); 
            })
                .then(jsonData => {
                console.log(jsonData);
            })
            .catch(error=>{
                console.log(error);
            })
        }

    //

    /* 
    Lancer IHM
    */
        getSearchSumbit();
    //
});