divGallery = document.querySelector(".gallery")
console.log(divGallery)

let i = 0

// Call `fetch()`, passing in the URL.
fetch("http://localhost:5678/api/works")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    works = response.json()
    works.then((data) => {

       /* let structureHtml = `
    <figure>
        <img src="${data[i].imageUrl}" alt="${data[i].title}"></img>
        <figcaption>${data[i].title}</figcaption>
    </figure>`*/

    let structureHtml = `
    <figure>
        <img src="${data[i].imageUrl}" alt="${data[i].title}"></img>
        <figcaption>${data[i].title}</figcaption>
    </figure>`


    for(i=0; i < data.length; i++) {
        
        divGallery.innerHTML = structureHtml
        console.log(divGallery)
    }

    /*data.forEach(work => {
        console.log(work)
        let structureHtml = `
    <figure>
        <img src="${data[work.id]}" alt="${data[work.title]}"></img>
        <figcaption>${data[work.title]}</figcaption>
    </figure>`

    divGallery.innerHTML = structureHtml

    });*/
  })
  
  .catch((err) => console.error(`Fetch problem: ${err.message}`));

})
