const photoCarousel = [
{		 
    col_name : 'Προϊστορικές Αρχαιότητες', 
    col_img : 'images/imageA1.jpg'
},
{ 
    col_name : 'Έργα Γλυπτικής',	 
    col_img :  './img/B16438.jpg'
},{
    col_name : 'Έργα Μεταλουργίας',
    col_img : 'images/imageC2.jpg'
}
]

let carouselPos = 0;
let linkText = "collection.html#TITLE" + `${carouselPos+1}`;

const panelCarousel = document.querySelector("#carousel");
const clink = document.querySelector("#collink");
const butLeft = document.querySelector("#butleft");

const imgpanel = document.createElement("img");
const aToColl = document.createElement("a");


butLeft.disabled = false;
imgpanel.setAttribute("src",photoCarousel[carouselPos].col_img);
panelCarousel.appendChild(imgpanel);
clink.appendChild(aToColl);
aToColl.setAttribute("href",linkText);
aToColl.classList.add("awhiteline");
aToColl.innerHTML = photoCarousel[carouselPos].col_name;

function previousColl(){
    if (carouselPos === 0 ){
        carouselPos = photoCarousel.length;
    }
    carouselPos = carouselPos - 1;
    imgpanel.src = photoCarousel[carouselPos].col_img; 
    linkText = "collection.html#TITLE" + `${carouselPos+1}`;
    aToColl.href = linkText;
    aToColl.innerHTML = photoCarousel[carouselPos].col_name;

}
function nextColl(){
    if (carouselPos === photoCarousel.length - 1 ){
        carouselPos = -1
    }
    carouselPos = carouselPos + 1;
    imgpanel.src = photoCarousel[carouselPos].col_img; 
    linkText = "collection.html#TITLE" + `${carouselPos+1}`;
    aToColl.href = linkText;
    aToColl.innerHTML = photoCarousel[carouselPos].col_name;

}






