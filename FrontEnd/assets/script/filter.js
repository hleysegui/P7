const url = "http://localhost:5678/api/categories"
const divFitler = document.querySelector('.filter')

import { listWork } from './works.js'

/**
 * Call API for get all Catégories
 * @returns {Array| String }
 */
export async function getCategories() {
    try {
        const response = await fetch(url)
        const categories = await response.json()
        return categories

    } catch(error) {
        throw new Error(error.message)
    }
}

let listCategory = getCategories()
listCategory.then((categories) => showCategories(categories))

/**
 * Browse categories for create filter by categorie 
 * Call function for active or not filter and get works by categorie
 * @param {Array} categories 
 */
function showCategories(categories) {

    let all = {id:0, name:"Tous"}
    categories.unshift(all)

    for (let index = 0; index < categories.length; index++) {
        let cat = categories[index]
        let inputFilter = document.createElement('button')

        inputFilter.classList.add("input-cat")
        inputFilter.dataset.id = cat.id
        inputFilter.textContent = cat.name
        divFitler.appendChild(inputFilter)

        if(cat.id === 0) {
            inputFilter.classList.add("active")
        }
    }

    const listCategory = document.querySelectorAll('.input-cat')
    const galleryItem = document.querySelectorAll('.gallery figure')

    for (let t = 0; t < listCategory.length; t++) {
        listCategory[t].addEventListener("click", function (event) {
            filterByCategory(listCategory, event),
                toggleGallery(listCategory[t].dataset.id, galleryItem)
        });

    }
}

/**
 * When detect an event click on categorie add class active
 * @param {Array} listCategory 
 * @param {Object} event 
 * @returns {Void}
 */
function filterByCategory(listCategory, event) {

    listCategory.forEach(element => {
        element.classList.remove("active")
    });
    event.target.classList.add("active")
}

/**
 * Browse GalleryItem and check if work categorie match with filter choose by user and display work 
 * @param {Integer} t 
 * @param {Array} galleryItem 
 * @returns {Void}
 */
function toggleGallery(t, galleryItem) {

     if(t == 0) {
        galleryItem.forEach(item => {
            item.style.display = "block"
        })
    } else {
        galleryItem.forEach(item => {
            item.dataset.id === t  
                ? (item.style.display = "block")
                : (item.style.display = "none")
        })
    } 
}