/**
 * Déclaration des variables 
 */
const url = "http://localhost:5678/api/users/login"
const form = document.querySelector('form');
const formSign = document.getElementById('sign')

let data = {}
const user = {}

/**
 * Call API for log user try connect if response ok save token and redirect to index page
 * @param { Array } user 
 * @returns { Object | Void }
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
 * Add event listening on submit form after check email and password call login function 
 * Throw error if something wrong
 * @returns {Void}
 */
form.addEventListener("submit", async (event) => {
    try {
        event.preventDefault()

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

/**
 * Check if password have less 2 caracters return false 
 * @param {String} userPsw 
 * @returns {boolean}
 */
function validPassword(userPsw) {
    if(userPsw.length < 2){
        return false
    }
    return true
}

/**
 * Use regular expression for check the email format
 * @param {String} userEmail 
 * @returns {boolean}
 */
function validEmail(userEmail) {
    let emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')

    if(!emailRegex.test(userEmail)) {
        return false
    } 
    return true
}

/**
 * Check input field if input empty throw an Error
 * @param {HTMLElement} field 
 * @returns {Void}
 */
function validField(field) {
    if(field.value === "") {
        throw new Error(`Le champ ${field.id} est vide`)
    }
}

/**
 * Manage error message for show to user
 * @param {String} message 
 * @returns {Void}
 */
function showErrorMessage(message) {
    let spanErreurMessage = document.querySelector('.errorMessage')
    spanErreurMessage.style.display = "block"
    spanErreurMessage.innerHTML = message
}