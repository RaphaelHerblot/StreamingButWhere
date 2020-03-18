document.addEventListener('DOMContentLoaded', () => {
    let hi = document.querySelector('#hi');
    let disconnectButton = document.querySelector('#disconnect');
    let connexionButton = document.querySelector('#connexionButton');
    let inscriptionButton = document.querySelector('#inscriptionButton');
    let favoriteParagraph = document.querySelector('#favoriteParagraph');

    disconnectButton.addEventListener('click', ()=>{
        localStorage.removeItem("user");
        location.reload();
    })

    const checkToken = (data) => {
        fetch('https://api.dwsapp.io/api/me/' + data)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData);
                displayFavorite(jsonData.data.favorite);
                hi.innerHTML = `Hey ${jsonData.data.user.pseudo} !`;
            })
            .catch(error => {
                console.log(error)
            })
    }
    
    const fetchRemoveFav = (id) => {
        let config = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        }
        fetch(`https://api.dwsapp.io/api/favorite/${id}`, config)
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

    const removeFavorite = () =>{
        let favoris = document.querySelectorAll('.deleting');
        console.log("ALEXXXXXXXXXXXXXXXXXXXXXXXXXX");
        for(let favori of favoris){
            favori.addEventListener('click', () =>{
                
                let id = favori.parentElement.getAttribute('fav-id');
                confirm("Voulez vous supprimer ce film de vos favoris ?")
                fetchRemoveFav(id);
                favori.parentElement.style.display = 'none'
            })
        }
    }

    const displayFavorite = (data) => {
        let favorite = document.querySelector('#favoriteParagraph');
        console.log(data) ;
        if(data.length != 0) {
            console.log("BONJOURRRRRRRRRRRRRRRRRRRR") ;
            favorite.innerHTML = `Tes films favoris sont les suivants : `
            for(let fav of data){
                console.log("WHAT") ;
                favorite.innerHTML += `<span movie-id="${fav.id}" fav-id="${fav._id}">${fav.title}. <input type="button" value="X" class="deleting"></span> `;
            }
        }
        else {
            console.log("BONJOUR") ;
            favorite.innerHTML += `Tu n'as pas encore de film favori `;
        }

        removeFavorite();
  
    } 

    if(localStorage.getItem("user")){
        connexionButton.style.display = 'none';
        inscriptionButton.style.display = 'none';
        favoriteParagraph.style.display = 'block';
        disconnectButton.style.display = 'initial';
        checkToken(localStorage.getItem("user"))     
    } else {
        connexionButton.style.display = 'initial';
        inscriptionButton.style.display = 'initial';
        favoriteParagraph.style.display = 'none';
        disconnectButton.style.display = 'none';
    }
})