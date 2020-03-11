document.addEventListener('DOMContentLoaded', () => {
    let email = document.querySelector('#email');
    let password = document.querySelector('#password');
    let form = document.querySelector('#connexion');

    let emailVar = null;
    let passwordVar = null;
    let fetchLoginData = {};
    let loginData = {};

    const checkToken = (data) => {
        fetch('https://api.dwsapp.io/api/me/' + data)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                console.log(jsonData)

            })
            .catch(error => {
                console.log(error)
            })
    }

    const fetchLogin = (fetchData) => {
    fetch('https://api.dwsapp.io/api/login', fetchData)
        .then(response => {
            return response.json();
        })
        .then(jsonData => {
            localStorage.setItem("user", jsonData.data.identity._id);
            checkToken(jsonData.data.identity._id);
            console.log(jsonData);
            document.location.href="./index.html"
        })
        .catch(error => {
            console.log(error);
        })
    }

    form.addEventListener('submit', (event) => {
        isLogin = 0;
        event.preventDefault();
        emailVar = email.value ;
        passwordVar = password.value ;

        if (emailVar !== null && passwordVar !== null) {
            fetchLoginData = {
                email: emailVar,
                password: passwordVar
            }
            loginData = {
                method: 'POST',
                body: JSON.stringify(fetchLoginData),
                headers: { 'Content-Type': 'application/json' }
            }
            fetchLogin(loginData)
        } else {
            console.log('erreur à la connection')
        }
        form.reset();
    })
})