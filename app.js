const addList = document.querySelector(".title");
const itemContaner = document.querySelector(".list-item-contaner");

const overlay = document.querySelector('.overlay');
const closeForm = document.querySelector('#overlay-close');
const save = document.querySelector(".save");
const websiteName = document.querySelector('#website-name');
const websiteLink = document.querySelector('#website-link');



const bookMarks = [];

// Created functions
function overlayRemove () {
    overlay.classList.toggle('hidden');
};

// loading data form local storage when user came back to website
function loadLocalStorageData() {
    const localStorageData = JSON.parse(localStorage.getItem('bookMarks'));
    console.log(localStorageData);

    if (localStorageData){
        localStorageData.forEach(value => {bookMarks.push(value)});

        bookMarks.forEach(ee => {
            const item = `
                <div class="item">
                    <img class="fav-icon" src="https://s2.googleusercontent.com/s2/favicons?domain=${ee.Wlink}" alt="${ee.Wname} icon"/>
                    <a target="_blank" href="http://${ee.Wlink}">${ee.Wname}</a>
                    <i class="remove" name="${ee.Wname}" class="remove">x</i>
                </div> 
            `;
            itemContaner.insertAdjacentHTML('beforeend', item);
        });

    }else{
        console.log('there is nothing in local storage');
    };
};

// save user's new book mark
function saveInfo (e) {
    e.preventDefault();
    bookMarks.push({
        Wname : websiteName.value,
        Wlink : websiteLink.value,
    });

    localStorage.setItem('bookMarks', JSON.stringify(bookMarks));

    const item = `
        <div class="item">
            <img class="fav-icon" src="https://s2.googleusercontent.com/s2/favicons?domain=${websiteLink.value}" alt="${websiteName.value} icon"/>
            <a target="_blank" href="http://${websiteLink.value}">${websiteName.value}</a>
            <i class="remove" name="${websiteName.value}">x</i>
        </div> 
    `;
    itemContaner.insertAdjacentHTML('beforeend', item);
    
    overlayRemove();
    websiteName.value = '';
    websiteLink.value = '';
    removeItemF();
};

// removing item form the bookmark
function removeItemF() {
    const removeItem = document.querySelectorAll('.remove')
    removeItem.forEach(item => {
        item.addEventListener('click', function () {
            const e = JSON.parse(localStorage.getItem('bookMarks')).findIndex(value => {
                return value.Wname == item.getAttribute('name');
            });
            console.log(e)
            bookMarks.splice(e, 1)
            console.log(bookMarks)
            localStorage.setItem('bookMarks', JSON.stringify(bookMarks));
            
            loadLocalStorageData()
        })
    });
};



// Event Listener
addList.addEventListener('click', overlayRemove);
closeForm.addEventListener('click', overlayRemove);
save.addEventListener('click', saveInfo);


// onload functions
loadLocalStorageData();
removeItemF();