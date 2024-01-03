// Variable 
const urlApi = "http://localhost:5678/api/works"
const divGallery = document.querySelector(".gallery")
const btnAdd = document.querySelector('.btn-add')
const bodyModal = document.querySelector('.modal-wrapper-body')

let modalGallery = document.querySelector('.gallery-modal')
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
//listWork.then((data) => filter(data))

// creation dynamique de la galery 
//param onGallery/userconnected bool
function createGallery(data, isConnected) {
    
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
    divGallery.innerHTML = ""
    modalGallery.innerHTML = ""
}

async function addProject() {

    let image = document.querySelector('.file').files[0]
    let title = document.getElementById('titre').value
    let category = 1

    console.log(image)
    console.log(title)
    console.log(category)

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
                console.log("error")
            }
        })

    } catch(error) {
        alert(error)
    }
}

function buildViewNewProject() {
    
    modalGallery.style.display = "none"
    btnAdd.style.display = "none"

    let title = document.querySelector('.modal-title')
    title.innerHTML = "Ajout Photo"

    let newProject = document.createElement('div')
    newProject.classList.add('new-project')
    newProject.innerHTML = `
    <form action="" method="POST" enctype="multipart/form-data" class="formProject">
        <div class="form-picture">
            <img id="previewPicture" alt="your image" width="100" height="100" />
            <i class="fa fa-picture-o iconPicture" aria-hidden="true"></i>
            <label for="file" class="labelFile">+ Ajouter photo</label>
            <input type="file" class="file" id="file">
            <span>jpg, png : 4mo max</span>
        </div>
        <label for="titre"><b>Titre</b></label>
        <input type="text" name="titre" id="titre">

        <label for="cat"><b>Catégorie</b></label>
        <select name="cat" id="cat">
            <option value="dog">Dog</option>
            <option value="cat">Cat</option>
            <option value="hamster">Hamster</option>
            <option value="parrot">Parrot</option>
            <option value="spider">Spider</option>
            <option value="goldfish">Goldfish</option>
        </select>

        <button type="submit">Valider</button>
    </form>`

    bodyModal.appendChild(newProject)

    const btnFile = document.querySelector('.file')
    const filePreview = document.getElementById("previewPicture")
    const iconFile = document.querySelector(".iconPicture")

    btnFile.addEventListener("change", function() {
        previewPhoto(btnFile, filePreview, iconFile)
    })

    const form = document.querySelector('form');

    form.addEventListener("submit", async (event) => {
        event.preventDefault()
        addProject()
    })
}

const previewPhoto = (input, img, icon) => {
    const file = input.files[0];

    if (verifExtensionFile(file.name) === true && file.size < 4194304 ) {
        // verifier extension 
        const fileReader = new FileReader();

        fileReader.onload = event => {
            img.style.display = "block"
            img.setAttribute('src', event.target.result);
            icon.style.display = "none"
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("erreur du fichier")
    }
}

function verifExtensionFile(file) {

    let regFile = new RegExp (/.(jpg|jpeg|png)$/i)

    if(!regFile.test(file)) {
        return false
    }
    return true
}

btnAdd.addEventListener("click", function() {
    buildViewNewProject()
})




