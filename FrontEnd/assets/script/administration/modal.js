const sectionProjet = document.getElementById("portfolio")
const newProject = document.createElement('div')

import { getCategories } from "../filter.js"
import { addProject } from "../works.js"

// Création de la modal au clic que edition 
function createModal() {

    let modal = document.createElement('div')
    modal.classList.add("modal-container")
    modal.innerHTML = `
    <div class="overlay modal-trigger"></div>
    <div class="modal" role="dialog" aria-labelledby="modalTitle">
        <button class="close-modal modal-trigger"><i class="fa-solid fa-times js-modal-close" aria-hidden="true"></i></button>
        <button class="back-modal"><i class="fa-solid fa-arrow-left" aria-hidden="true"></i></button>
        <h1 id="modalTitle">Galerie photo</h1>
        <div class="gallery-modal"><!--Générer en JS--></div>
        <div class="modal-wrapper-body"></div>
        <hr class="horizontal-line__1"></hr>
        <div class="model-wrapper-footer">
            <div class="footer-modal">
                <button class="btn-add">Ajouter une photo</button>
            </div>
        </div>
    </div>`

    sectionProjet.appendChild(modal)

    const modalContainer = document.querySelector(".modal-container")
    const modalTriggers = document.querySelectorAll(".modal-trigger")
    
    modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal))

    // Ajouter class active ou non au clic 
    function toggleModal() {
        modalContainer.classList.toggle("active")
    }
}

createModal()

const previewModal = document.querySelector(".back-modal")
previewModal.addEventListener("click", backModal)

const btnAdd = document.querySelector('.btn-add')
btnAdd.addEventListener("click", function() {
    buildViewNewProject()
})

function buildViewNewProject() {

    const modalGallery = document.querySelector('.gallery-modal')
    const bodyModal = document.querySelector('.modal-wrapper-body')
    const prevModal = document.querySelector(".back-modal")
    const horizontalLine1 = document.querySelector(".horizontal-line__1")
    
    modalGallery.style.display = "none"
    btnAdd.style.display = "none"
    bodyModal.style.display = "block"
    prevModal.style.display = "block"
    horizontalLine1.style.display = "none"  

    let title = document.getElementById('modalTitle')
    title.innerHTML = "Ajout Photo"

    newProject.classList.add('new-project')
    newProject.innerHTML = `
    <form action="" method="POST" enctype="multipart/form-data" class="formProject">
        <div class="form-picture">
            <img id="previewPicture" alt="" />
            <i class="fa fa-picture-o fa-5x iconPicture" aria-hidden="true"></i>
            <label for="file" class="labelFile">+ Ajouter photo</label>
            <input type="file" class="file" id="file">
            <span class="pictureFormat">jpg, png : 4mo max</span>
        </div>
        <div class="titre-projet">
            <label for="titre"><b>Titre</b></label>
            <input type="text" name="titre" id="titre">
        </div>
        <div class="categorie-projet">
            <label for="cat"><b>Catégorie</b></label>
            <select name="cat" id="cat" class="list-cat">
                <option value=""></option>
            </select>
        </div>
        <span class="errorForm"></span>
        <hr class="horizontal-line"></hr>
        <div class="model-wrapper-footer">
            <div class="footer-modal">
                <button type="submit" class="btn-valider">Valider</button>
            </div>
        </div>
    </form>
    `
    bodyModal.appendChild(newProject)

    /**
     * création dynamique des options 
     */
    let listCat = getCategories()
    let select = document.getElementById("cat")

    listCat.then((categories) => {
        categories.forEach(element => {
            
            let option = document.createElement("option")
            option.value = element.id
            option.text = element.name
            select.add(option)
        });
    })

    /**
     * Déclaration variables et appel fonction preview 
     */

    const btnFile = document.querySelector('.file')
    const filePreview = document.getElementById("previewPicture")
    const iconFile = document.querySelector(".iconPicture")

    btnFile.addEventListener("change", function() {
        previewPhoto(btnFile, filePreview, iconFile)
    })

    // Par défaut on désactive le bouton envoyer
    const btnValider = document.querySelector(".btn-valider")
    btnValider.setAttribute('disabled', true)
    btnValider.style.backgroundColor = "#A7A7A7"
    

    // Récupération des champs du formulaire pour activer/désactiver bouton submit au change
    let formProject = document.querySelector("form")
    let fields = formProject.elements
    let counter = 0

    for (let index = 0; index < fields.length; index++) {
        const element = fields[index];
        element.addEventListener("change", function() {
            counter++
            if(counter === 3 && fields[1].value !== "" && fields[2].value !== "" && fields[0].files[0] !== "") {
                btnValider.removeAttribute('disabled', true)
                btnValider.style.backgroundColor = "#1D6154"
                submitForm()
            } else {
                btnValider.setAttribute('disabled', true)
                btnValider.style.backgroundColor = "#A7A7A7"
                
            }
        })
    }
}

/**
 * A la sélection de la photo affiche l'image sans rafraichir
 */
const previewPhoto = (input, img, icon) => {
    const file = input.files[0];
    const labelFile = document.querySelector(".labelFile")
    const pictureFormat = document.querySelector(".pictureFormat")

    if (verifExtensionFile(file.name) === true && file.size < 4194304 ) {
        // verifier extension 
        const fileReader = new FileReader();

        fileReader.onload = event => {
            img.style.display = "block"
            img.setAttribute('src', event.target.result);
            icon.style.display = "none"
            labelFile.style.display = "none"
            pictureFormat.style.display = "none"
        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Vérifier le format et la taille du fichier")
    }
}

/**
 * Vérification du format de l'image choisis 
 */
function verifExtensionFile(file) {

    let regFile = new RegExp (/.(jpg|jpeg|png)$/i)

    if(!regFile.test(file)) {
        return false
    }
    return true
}

// Retoune sur la modal galerie photo
function backModal() {
    const modalGallery = document.querySelector('.gallery-modal')
    const bodyModal = document.querySelector('.modal-wrapper-body')
    const prevModal = document.querySelector(".back-modal")
    const horizontalLine1 = document.querySelector(".horizontal-line__1")

    let title = document.getElementById('modalTitle')
    title.innerHTML = "Galerie Photo"
    
    modalGallery.style.display = "flex"
    btnAdd.style.display = "inline"
    bodyModal.style.display = "none"
    prevModal.style.display = "none"
    horizontalLine1.style.display = "block"
}

/**
* Soumission du formulaire appel fonction addProject de works.js avec parametres
**/
function submitForm() {
     
    const form = document.querySelector('form');
    const errorForm = document.querySelector(".errorForm")

    let image = document.querySelector('.file')
    let titleForm = document.getElementById('titre')
    let category = document.getElementById('cat') 

    form.addEventListener("submit", async (event) => {
        event.preventDefault()

        if(image.files[0] === undefined || titleForm.value === "" || category.value === "") {
            errorForm.textContent = "Tous les champs doivent être remplis"
        } else {
            errorForm.style.display = "none"
            addProject(image.files[0], titleForm.value, category.value)
        }
    }) 
}