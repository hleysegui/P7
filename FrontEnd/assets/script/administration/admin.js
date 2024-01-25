const login = document.querySelector('.login') 
const filter = document.querySelector('.filter') 
const isConnected = document.querySelector(".isConnected")
export const token = localStorage.getItem("token")
const portfolio = document.getElementById("portfolio")
const titlePortfolio = document.querySelector("#portfolio h2")

/**
 * if token is empty or null means user is not connected and return false
 * @returns {Boolean}
 * @returns {Void}
 */
export function alreadyConnected() {
    if(token === "" || token === null) {
        return false
    }
    return true
}

/**
 * Call function for check is the user is connected for display admin bar
 * @returns {Void}
 */
function adminView() {
    if(alreadyConnected() === true) {
        createAdminBar()
        addBtnEditProject()

        login.style.display = "none"
        filter.style.display = "none"
    
        let logout = document.createElement('a')
        logout.classList.add("logout")
        logout.innerHTML = "logout"
        isConnected.appendChild(logout)

        const header = document.querySelector(".header")
        header.style.marginTop = "100px"
    
        logout.addEventListener("click", function() {
            localStorage.removeItem("token")
            window.location.href = "index.html"
        })
    }
}

/**
 * Create the admin block for edition
 * @returns {Void}
 */
function createAdminBar() {
    let bar = document.createElement('aside')
    bar.classList.add("edit-content")
    bar.innerHTML = `<div class="edit">
                        <i class="fa-regular fa-pen-to-square"></i>
                        <p class="edit-project modal-trigger">Mode édition</p>
                    </div>`

    document.body.prepend(bar) 
}

/**
 * Add the button edit when user is connected 
 * @returns {Void}
 */
function addBtnEditProject() {
    let divProject = document.createElement('div')
    divProject.classList.add("projets")
    portfolio.prepend(divProject)

    divProject.appendChild(titlePortfolio)

    let btnEdit = document.createElement("div")
    btnEdit.classList.add("edit-projet")
    btnEdit.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>
                        <p class="edit-project modal-trigger">Mode édition</p>`
    divProject.appendChild(btnEdit)
    
}

adminView()