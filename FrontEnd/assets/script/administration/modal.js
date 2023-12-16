let modal = null
const btnEdit = document.querySelector(".js-modal")
const sectionProjet = document.getElementById("portfolio")

const openModal = function(e) {
    e.preventDefault()

    const target = document.querySelector(btnEdit.getAttribute('href'))
    target.style.display = null
    target.removeAttribute('aria-hidden', false)
    target.setAttribute('aria-modal', 'true')
    modal = target
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
}

const closeModal = function(e) {
    if(modal === null) return 
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', true)
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal = null
}


function createModal() {

    let myModal = document.createElement('div')
    myModal.innerHTML = 
    `<aside id="modal1" class="modal" aria-hidden="true" role="dialog" style="display: none;">
        <div class="modal-wrapper">
            <div class="model-wrapper-close">
                <i class="fa-solid fa-times js-modal-close"" aria-hidden="true"></i>
            </div>
            <h2>Galerie photo</h2>
            <div class="model-wrapper-body">
                <div class="gallery">
                    <!--Générer en JS-->
                </div>
            </div>
            <div class="model-wrapper-footer">
                <div class="footer-modal">
                    <button>Ajouter une photo</button>
                </div>
            </div>
        </div>
    </aside>`
    sectionProjet.appendChild(myModal)

    
    document.querySelectorAll('.edit-project').forEach(a => {
        a.addEventListener("click", openModal) 
    })
}

createModal()