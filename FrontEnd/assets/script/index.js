const login = document.querySelector('.login') 
const isConnected = document.querySelector(".isConnected")
const token = localStorage.getItem("token")
const portfolio = document.getElementById("portfolio")
const titlePortfolio = document.querySelector("#portfolio h2")

// Fonction pour savoir si l'utilsateur est déja connecté ou non
function alreadyConnected() {
    if(token === "") {
        return false
    }
    return true
}

//Ajoute tous les éléments quans utilisateur est connecté en admin 
function adminView() {

    if(alreadyConnected) {
        createAdminBar()
        addBtnEditProject()

        login.style.display = "none"
    
        let logout = document.createElement('a')
        logout.classList.add("logout")
        logout.innerHTML = "logout"
        isConnected.appendChild(logout)
    
        logout.addEventListener("click", function() {
            localStorage.removeItem("token")
            window.location.href = "login.html"
        })
    
    }
}

// Création de la bar d'édition en mode admin
function createAdminBar() {
    let bar = document.createElement('aside')
    bar.classList.add("edit-content")
    bar.innerHTML = `<div class="edit">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <a href="#modal1" class="js-modal edit-project">Mode édition</a>
                    </div>`

    document.body.prepend(bar) 
}

//Ajotuer btn pour modifier les projets
function addBtnEditProject() {
    let divProject = document.createElement('div')
    divProject.classList.add("projets")
    portfolio.prepend(divProject)

    divProject.appendChild(titlePortfolio)

    let btnEdit = document.createElement("div")
    btnEdit.classList.add("edit-projet")
    btnEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
                        <p class="edit-project">Mode édition</p>`
    divProject.appendChild(btnEdit)
    
}

alreadyConnected()
adminView()

