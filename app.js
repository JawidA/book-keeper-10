const addList = document.querySelector(".title");
const itemContaner = document.querySelector(".list-item-contaner");

const overlay = document.querySelector('.overlay');
const closeForm = document.querySelector('#overlay-close');
const save = document.querySelector(".save");
const websiteName = document.querySelector('#website-name');
const websiteLink = document.querySelector('#website-link');

const bookMarks = [];



function overlayRemove () {
    overlay.classList.toggle('hidden')
}

function loadLocalStorageData() {
    const localStorageData = JSON.parse(localStorage.getItem('bookMarks'));
    console.log(localStorageData)
    if (localStorageData)

    localStorageData.forEach(ee => {
        const item = `
            <div class="item">
                <a href="http://${ee.Wlink}">${ee.Wname}</a>
                <i class="fa-solid fa-xmark" id="remove">x</i>
            </div> 
        `;
        itemContaner.insertAdjacentHTML('beforeend', item);
    });
};


function saveInfo (e) {
    e.preventDefault()
    bookMarks.push({
        Wname : websiteName.value,
        Wlink : websiteLink.value,
    });
    console.log(bookMarks)

    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));

    const item = `
        <div class="item">
            <a href="http://${websiteLink.value}">${websiteName.value}</a>
            <i class="fa-solid fa-xmark" id="remove">x</i>
        </div> 
    `;

    itemContaner.insertAdjacentHTML('beforeend', item);
    overlayRemove();
    websiteName.value = ''
    websiteLink.value = ''

}


console.log(typeof JSON.parse(localStorage.getItem("bookMarks")))




addList.addEventListener('click', overlayRemove);
closeForm.addEventListener('click', overlayRemove);

save.addEventListener('click', saveInfo);


// onload functions
loadLocalStorageData()
