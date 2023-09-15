const addList = document.querySelector(".title");
const itemContaner = document.querySelector(".list-item-contaner");

const overlay = document.querySelector('.overlay');
const closeForm = document.querySelector('#overlay-close');
const websiteName = document.querySelector('#website-name');
const websiteLink = document.querySelector('#website-link');
const form = document.querySelector('.form');

let bookMarks = [];

function addBookMark() {
    overlay.classList.toggle('hidden');
    websiteName.focus();
};

function loadBookMarks () {
    if (localStorage.getItem('bookMark')) {
        bookMarks = JSON.parse(localStorage.getItem('bookMark'));
        itemContaner.textContent = '';
        bookMarks.forEach(el => {
            const html = `
            <div class="item">
                <img class="fav-icon" src="https://s2.googleusercontent.com/s2/favicons?domain=${el.link}" alt="google icon"/>
                <a href="${el.link}" target="_blank">${el.name}</a>
                <i class="fas fa-times remove" adr="${el.link}" onclick="deleteBookMark('${el.link}')" title="Remove"></i>
            </div> 
        `;
        itemContaner.insertAdjacentHTML('beforeend', html);
        });
    }
    else {
        console.log('there is no data in the local storage.');
    };
};

function saveBookMark (e) {
    e.preventDefault();
    const nameValue = websiteName.value;
    let linkValue = websiteLink.value;
    linkValue = linkValue.includes("http://") && linkValue.includes("https://") ? linkValue : `http://${linkValue}`;

    bookMarks.push({
        name : nameValue,
        link : linkValue,
    });

    localStorage.setItem('bookMark', JSON.stringify(bookMarks));
    form.reset();
    websiteName.focus();
    loadBookMarks();
    addBookMark();
};

// in the function bellow onclick is used. "li" is the value of onclick parameter, and you have to use this way.
// if you try to remove any book mark the link of that will be copied as "li" value, which we are comparing with el.link.
// if you dont understand this part just focus on onclick in line 26 and the relation of that with the function bellow.
function deleteBookMark (li) {
    bookMarks.splice(bookMarks.findIndex(el => el.link == li), 1);
    localStorage.setItem('bookMark', JSON.stringify(bookMarks));
    loadBookMarks();
};

// Event listener
addList.addEventListener('click', addBookMark);
closeForm.addEventListener('click', addBookMark);
form.addEventListener('submit', saveBookMark);

loadBookMarks();