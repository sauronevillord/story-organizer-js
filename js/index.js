const sidebar = document.getElementById("sidebar");
const right_container = document.getElementById("right-container");
const divbar = document.getElementById("divbar");

var posX, initPerc;

function clamp(value, min, max) {
    if ( value > max ) {
        value = max;
    } else if ( value < min ) {
        value = min;
    }
    return value;
}

divbar.addEventListener('mousedown', (event) => {
    event.preventDefault();

    posX = event.clientX;
    initPerc = sidebar.offsetWidth * 100 / window.innerWidth;
    console.log(initPerc);

    divbar.style.cursor = 'grabbing';

    document.addEventListener('mousemove', dragElement);
    document.addEventListener('mouseup', releaseElement);
});

function dragElement(event) {
    let incX = (event.clientX - posX) * 100 / window.innerWidth;
    new_width = initPerc + incX;
    new_width = clamp(new_width, 10, 90);
    sidebar.style.width = ""+new_width+"vw";
    right_container.style.width = ""+(100 - new_width)+"vw";
}

function releaseElement() {
    divbar.style.cursor = 'grab';

    document.removeEventListener('mousemove', dragElement);
    document.removeEventListener('mouseup', releaseElement);
}

function selectEntry ( category_pos, entry_pos ) {
    right_container.innerHTML = '';

    let category = current_project.categories[category_pos];

    console.log(category);
    
    let entry = category.entries[entry_pos];

    createCard(entry);


    


}

function createCard(entry){
    let card = document.createElement('div');
    card.classList.add('card');
    let cardContent = document.createElement('div');
    cardContent.classList.add('card__content');
    let cardTitle = document.createElement('h3');
    cardTitle.textContent = entry.name;
    let image = document.createElement('img');
    image.src="./resources/images/how-to-draw-a-cartoon-monster-step-6-removebg-preview.png";
    let btnChangeImg = document.createElement('input');
    btnChangeImg.type = "file";
    btnChangeImg.accept = "image/png, image/jpeg";
    btnChangeImg.onchange = function(){
        image.src = URL.createObjectURL(btnChangeImg.files[0]);
    }
    let textarea = document.createElement('textarea');
    textarea.placeholder = "Inserisci il testo qui...";
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(image);
    cardContent.appendChild(btnChangeImg);
    cardContent.appendChild(textarea);
    card.appendChild(cardContent);
    right_container.appendChild(card);

}