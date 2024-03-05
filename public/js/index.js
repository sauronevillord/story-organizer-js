const sidebar = document.getElementById("sidebar");
const right_container = document.getElementById("right-container");
const container_flex = document.getElementById("container-flex");
const divbar = document.getElementById("divbar");

var posX, initPerc, generatedImage = 0;

window.onload = () => { // MAIN
    window.setInterval(10 * 1000, saveProject);
}

function saveProject() {
    console.log("Marcouli te tocca fallo!!");
}

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
    createCard();
}

function createEmptyCard() {
    createCard(/*cose di default*/);
}

function createCard() {
    let card = document.createElement('div');
    card.className = 'card';
    
    let image = document.createElement('img');
    image.src="./resources/images/how-to-draw-a-cartoon-monster-step-6-removebg-preview.png";
    image.className = 'card-content-margin';
    let btnChangeImg = document.createElement('input');
    btnChangeImg.type = "file";
    btnChangeImg.accept = "image/png, image/jpeg";
    
    
    btnChangeImg.onchange = function(){
        image.src = URL.createObjectURL(btnChangeImg.files[0]);
        encodeImageAsDataURL(btnChangeImg.files[0]);
    }
    
    
    let textarea = document.createElement('textarea');
    textarea.placeholder = "Inserisci il testo qui...";
    textarea.className = 'card-content-margin';
    card.appendChild(image);
    card.appendChild(btnChangeImg);
    card.appendChild(textarea);
    right_container.appendChild(card);
    
    let button = document.createElement('button');
    button.className = 'primary card-content-margin';
    button.textContent = '+';
    button.addEventListener('click', createCard);
    card.appendChild(button);

}

function encodeImageAsDataURL(file) {
    var reader = new FileReader();
    reader.onloadend = function() {
      var base64String = reader.result.replace(/^data:image\/\w+;base64,/, '');
      storeInLocalStorage(base64String);
      console.log(base64String);
    };
    reader.readAsDataURL(file);
  }
  

function storeInLocalStorage(imageInBase64){
    generatedImage++;
    localStorage.setItem("img-"+generatedImage, imageInBase64);
}