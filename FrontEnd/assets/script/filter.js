const url = "http://localhost:5678/api/categories"
const divFitler = document.querySelector('.filter')

async function getCategories() {
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

function showCategories(categories) {

    let btn = document.createElement('button')
    btn.textContent = "Tous"
    btn.classList.add("input-cat")
    divFitler.appendChild(btn)

    for (let index = 0; index < categories.length; index++) {
        let cat = categories[index]
        let inputFilter = document.createElement('button')

        inputFilter.classList.add("input-cat")
        inputFilter.dataset.id = cat.id
        inputFilter.textContent = cat.name
        divFitler.appendChild(inputFilter)
    }

    const listCategory = document.querySelectorAll('.input-cat')
    const galleryItem = document.querySelectorAll('.gallery figure')

    for (let t = 0; t < listCategory.length; t++)
        listCategory[t].addEventListener("click", function () {
            filterByCategory(listCategory[t], galleryItem),
                toggleGallery(listCategory[t].dataset.id, galleryItem)

        });
}

// Add remove class active 
function filterByCategory(t, galleryItem) {

    galleryItem.forEach(t => {
        t.classList.remove("active")
    });
    t.classList.add("active")
}

//hidden or display item
function toggleGallery(t, galleryItem) {

    if(t === "Tous" || t === undefined) {
        galleryItem.forEach(item => {
            item.style.display = "block"
        });
    } else {
        galleryItem.forEach(item => {
            item.dataset.id === t  
                ? (item.style.display = "block")
                : (item.style.display = "none")
        });
    }
}