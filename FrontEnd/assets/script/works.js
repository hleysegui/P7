// Variable 
const urlApi = "http://localhost:5678/api/works"
const divGallery = document.querySelector(".gallery")
let data = {}

import { alreadyConnected, token } from '../script/administration/admin.js'

// Récupération des travaux via l'api "http://localhost:5678/api/works"
async function getWorks() {
    try {
        const response = await fetch(urlApi)
        data = response.json()
        return data
       
    } catch(error) {
        console.error(error) 
    }
} 

let listWork = getWorks()
listWork.then((data) => createGallery(data))



// creation dynamique de la galery 
function createGallery(data, isConnected) {

    let modalGallery = document.querySelector('.gallery-modal')
    
    isConnected = alreadyConnected()

    for(let i=0; i < data.length; i++) {
        let figure = document.createElement('figure')
        figure.dataset.class = data[i].category.name
        figure.dataset.id = data[i].category.id
        figure.classList.add('project-' + data[i].id)
        figure.classList.add("active")
        divGallery.appendChild(figure)
        
        let image = document.createElement('img')
        image.src = data[i].imageUrl
        image.alt = data[i].title
        figure.appendChild(image)

        let figcaption = document.createElement('figcaption')
        figcaption.innerHTML = data[i].title
        figure.appendChild(figcaption)

        if(isConnected === true) {
            let divImage = document.createElement('div')
            divImage.classList.add('img-project')
            divImage.classList.add('img-' + data[i].id)
            modalGallery.appendChild(divImage)
            divImage.appendChild(image.cloneNode(true))

            let iDelete = document.createElement('button')
            iDelete.classList.add('btn-project')
            iDelete.setAttribute('id', data[i].id)
            iDelete.innerHTML = `<i class="fa fa-trash" aria-hidden="true"></i>`
            divImage.appendChild(iDelete)

            document.querySelectorAll('.btn-project').forEach(a => {
                a.addEventListener("click", function() {
                    let idProject = a.getAttribute('id')
                    deleteProject(idProject)
                })
            }) 
        } 
   }
}

//Function suppression projet par id du projet
async function deleteProject(idProject) {

    try {
        await fetch('http://localhost:5678/api/works/' + idProject, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}`},
        })
        .then(response => {
            if (response.status === 204) {
                refreshProject()
            } else if(response.status === 401) {
                alert(" Merci de vous connecter avec un compte pour pouvoir supprimer un projet")
                window.location.href = "login.html";
            }
        })

    } catch(error) {
        alert(error)
    }
}

// Rafraichit les projets sans recharger la page
function refreshProject() {
    resetProject()

    let refreshWorks = getWorks()
    refreshWorks.then((data) => { 
        createGallery(data)
    })
}

function resetProject() {
    let modalGallery = document.querySelector('.gallery-modal')

    divGallery.innerHTML = ""
    modalGallery.innerHTML = ""
}

export async function addProject(image, title, category) {
    try {
        const project = new FormData()
        project.append("image", image)
        project.append("title", title)
        project.append("category", category)

        await fetch('http://localhost:5678/api/works/', {
            method: 'POST',
            headers: { Authorization: `Bearer ${token}`},
            body: project,
        })
        .then(response => {
            if (response.status === 204) {
                console.log(response)
            } else if(response.status === 401) {
                alert("Vous devez vous identifiez pour ajouter un projet")
            }
        })

    } catch(error) {
        alert(error)
    }
}