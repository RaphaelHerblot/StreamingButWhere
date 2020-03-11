document.addEventListener('DOMContentLoaded', () => {

    let email = document.querySelector('#email') ;
    let pseudo = document.querySelector('#pseudo') ;
    let password = document.querySelector('#password') ;
    let form = document.querySelector('#loginForm') ;

    let emailVar = null ;
    let pseudoVar = null ;
    let passwordVar = null ;

    let fetchInscriptionData = {} ;
    let inscriptionData = {} ;

    const fetchInscription = (fetchVar) => {
        fetch('https://api.dwsapp.io/api/register', fetchVar)
        .then(response => {
            return response.json() ;
        })
        .then(jsonData => {
            console.log(jsonData);
            document.location.href="./index.html"
        })
        .catch(error => {
            console.log(error) ;
        })
    }

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        emailVar = email.value ;
        pseudoVar = pseudo.value ;
        passwordVar = password.value ;

        console.log(pseudoVar.length);
        console.log(password.length);
        console.log(emailVar);

        if(emailVar !== null && pseudoVar !== null && passwordVar !== null && pseudoVar.length > 3 && passwordVar.length > 3){
            fetchInscriptionData = {
                email: emailVar,
                password: passwordVar,
                pseudo: pseudoVar
            }
            inscriptionData = {
                method: 'POST',
                body: JSON.stringify(fetchInscriptionData),
                headers: { 'Content-Type': 'application/json' }
            }
            fetchInscription(inscriptionData)
        } 
        
        else {
            console.log('Il y a eu une erreur lors de votre inscription !')
        }
        form.reset();
    })
})