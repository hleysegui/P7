/**
 * Déclaration des variables globales
 */
const url = "http://localhost:5678/api/users/login"
const form = document.querySelector('form');

/**
 * Fontion de connexion de l'utilisateur
 * @param {user} user 
 */
async function login(user) {
    try {
        await fetch(url, {
            method: 'post',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if(!response.ok) {
                throw Error(response.statusText)
            }
            data = response.json()
            return data
        }).then(data => {
            localStorage.setItem("token", data.token)
            window.location.href = "index.html"
        })

    } catch(error) {
        showErrorMessage(error.message)
    }
}

/**
 * Ajout d'un écouteur d'évement sur le submit du formulaire
 * Création de l'objet user
 * Vérification du mot de passer et email avec appel de la fonction login() si tout est valide
 * Gestion des erreurs
 */
form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault()

        const user = {}
        user.email =  document.getElementById("email").value
        user.password = document.getElementById("psw").value
        
        let baliseEmail = document.getElementById("email")
        validField(baliseEmail)

        let balisePsw = document.getElementById("psw")
        validField(balisePsw)

       if(validEmail(user.email) === true && validPassword(user.password === true)) {
            login(user)
        }

    } catch(error) {
        showErrorMessage(error.message)
    }
})

// Vérifier que le nombre de caractère saisi dans le champs mot de passe est supérieur à 2 caractere
function validPassword(userPsw) {
    if(userPsw.length < 2){
        return false
    }
    return true
}

// Mise en place d'une expréssions régulière, pour vérifier si l'adresse email respecte le bon format
function validEmail(userEmail) {
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

    if(!emailRegex.test(userEmail)) {
        return false
    } 
    return true
}

// Fonction de vérification que les champs du formulaire ne soit pas vide
function validField(field) {
    if(field.value === "") {
        throw new Error(`Le champ ${field.id} est vide`)
    }
}

// Gestion des messages d'erreur et retour à l'utilisateur
function showErrorMessage(message) {
    let spanErreurMessage = document.querySelector('.errorMessage')
    spanErreurMessage.style.display = "block"
    spanErreurMessage.innerHTML = message
}
