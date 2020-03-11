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

    const displayFavorite = (data) => {
        let favorite = document.querySelector('#favorite');
        for(let fav of data){
            favorite.innerHTML += `${fav.id}, `;
        }
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