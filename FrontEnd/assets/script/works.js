// Variable 
const divGallery = document.querySelector(".gallery");
const divFitler = document.querySelector('.filter')
let data = {}

// Récupération des travaux via l'api "http://localhost:5678/api/works"
async function getWorks() {
    try {
        const response = await fetch("http://localhost:5678/api/works")
        data = response.json()
        return data
       
    } catch(error) {
        console.error(error) 
    }
} 

listWork = getWorks()
listWork.then((data) => createGallery(data))
listWork.then((data) => filter(data))

// creation dynamique de la galery 
function createGallery(data) {

   for(let i=0; i < data.length; i++) {
        let figure = document.createElement('figure')
        figure.dataset.class = data[i].category.name
        figure.classList.add("active")
        divGallery.appendChild(figure)
        
        let image = document.createElement('img')
        image.src = data[i].imageUrl
        image.alt = data[i].title
        figure.appendChild(image)

        let figcaption = document.createElement('figcaption')
        figcaption.innerHTML = data[i].title
        figure.appendChild(figcaption)
   }
}

function filter(obj) {
    
    let mySet = new Set()

    mySet.add("Tous")

    obj.forEach(cat => {
        mySet.add(cat["category"].name)
    });

    for (const item of mySet) {
        let inputFilter = document.createElement('button')

        inputFilter.classList.add("input-cat")
        inputFilter.dataset.class = item
        inputFilter.textContent = item
        divFitler.appendChild(inputFilter)
    }

    const listCategory = document.querySelectorAll('.input-cat')
    const galleryItem = document.querySelectorAll('.gallery figure')

    for (let t = 0; t < listCategory.length; t++)
        listCategory[t].addEventListener("click", function () {
            filterByCategory(listCategory[t], galleryItem),
                toggleGallery(listCategory[t].textContent, galleryItem)

        });
}

// Add/remove class active 
function filterByCategory(t, galleryItem) {

    galleryItem.forEach(t => {
        t.classList.remove("active")
    });
    t.classList.add("active")
}

//hidden or display item
function toggleGallery(t, galleryItem) {
    
    if(t === "Tous") {
        galleryItem.forEach(item => {
            item.style.display = "block"
        });
    } else {
        galleryItem.forEach(item => {
            item.dataset.class === t  
                ? (item.style.display = "block")
                : (item.style.display = "none")
        });
    }
}