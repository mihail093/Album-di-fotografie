let photoButton = document.getElementById('button-addon1');
let photoInput = document.getElementById('photoInput');
let radio1 = document.getElementById('flexRadioDefault1');
let radio2 = document.getElementById('flexRadioDefault2');

function addPhoto () {
    let searchPhoto = photoInput.value;
    let loadPhoto = fetch(`https://api.pexels.com/v1/search?query=${searchPhoto}`, {
        headers: {
            Authorization: "BRBgtowXsYlRYl08ulI1z5lGdabavXjANX7284DEqS1qEhpJeWyIl3ui"
        }
    });
    loadPhoto.then((risposta)=> risposta.json()).then((rispostaElaborata)=> {
        if (!radio1.checked || radio2.checked) {
            document.getElementById('album').innerHTML = rispostaElaborata.photos.map((image)=>
            `<div class="col">
                <div class="card shadow-sm">
                    <img src="${image.src.landscape}">
                    <div class="card-body">
                        <p class="card-text">
                            ${image.alt}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button onclick="viewButton('${image.src.landscape}')" type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-body-secondary">
                                ${image.photographer}
                            </small>
                        </div>
                    </div>
                </div>
            </div>`
        ).join("");
        } else if (radio1.checked) {
            document.getElementById('album').innerHTML = rispostaElaborata.photos.map((image)=>
            `<div class="col">
                <div class="card shadow-sm">
                    <img src="${image.src.portrait}">
                    <div class="card-body">
                        <p class="card-text">
                            ${image.alt}
                        </p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                                <button onclick="viewButton('${image.src.portrait}')" type="button" class="btn btn-sm btn-outline-secondary">View</button>
                                <button type="button" class="btn btn-sm btn-outline-secondary">Edit</button>
                            </div>
                            <small class="text-body-secondary">
                                ${image.photographer}
                            </small>
                        </div>
                    </div>
                </div>
            </div>`
        ).join("");
        }
    })
}

photoButton.addEventListener('click', addPhoto);
photoInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        addPhoto();
    }
});

function viewButton(imageUrl) {
    let overlay = document.createElement('div');
    overlay.classList.add('overlay-style');

    let img = document.createElement('img');
    img.src = imageUrl;
    img.classList.add('img-style');

    overlay.addEventListener('click', function() {
        document.body.removeChild(overlay);
    });

    overlay.appendChild(img);
    document.body.appendChild(overlay);
}

// Funzione che verifica se un elemento è visibile nella viewport
function isElementInView(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Aggiungi il listener per l'evento scroll sulla finestra
window.addEventListener('scroll', function() {
    // Selezioniamo l'elemento target tramite il suo ID
    const targetElement = document.getElementById('targetElement');
    if (targetElement) {
        // Controlliamo se l'elemento è nella viewport
        if (isElementInView(targetElement)) {
            let fleshBox = document.querySelector('.flash-box');
            fleshBox.style.animation = 'changeBgColor 0.3s ease-in-out 3s 3';
        }
    }
});

