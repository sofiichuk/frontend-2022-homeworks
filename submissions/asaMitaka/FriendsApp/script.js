const url = 'https://randomuser.me/api/?results=12';
const content = document.querySelector('.articleBlock');
const ageForm = document.querySelector('#ageForm');
const genderForm = document.querySelector('#genderForm');
const search = document.querySelector('#search');
let friends = [];
let friendsCopy = [];

const filterState = {
    search: null, 
    gender: null,
    sort: null,
    reset() {
        this.search = null;
        this.gender = null;
        this.sort = null;
    }
}

const getData = (url) => fetch(url)
    .then(handleErrors)
    .then(res => res.json())
    .then(res =>  {
        friends = [...res.results];
        init();
    });

function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.statusText);
    }
    return res;
}

function filterByGender(id, usersToFilter) {
    let filteredUsers = [...usersToFilter];
    switch(id) {
        case 'male':
        case 'female':
            filteredUsers = usersToFilter.filter(item => item.gender === id);
            break;
        case 'all':   
            filteredUsers = [...friends];
            break;
    }
    return filteredUsers;
}

function sortByAge(a, b) {
    return a.dob.age - b.dob.age;
}

function sortByLastName(a, b) {
    return a.name.last !== b.name.last ? a.name.last < b.name.last ? -1 : 1 : 0;
}

function sortBy(id, usersToSort) {
    switch(id) {
        case 'ageMore':
            usersToSort = usersToSort.sort((a, b) => sortByAge(a, b));
            break;
        case 'ageLess':
            usersToSort = usersToSort.sort((a, b) => sortByAge(b, a));
            break;
        case 'lastAToZ':
            usersToSort = usersToSort.sort((a, b) => sortByLastName(a, b));
            break;
        case 'lastZToA':
            usersToSort = usersToSort.sort((a, b) => sortByLastName(b, a));
            break;
    }
    return usersToSort;
}

function filterBySearch(searchValue, usersToSearch) {
	return usersToSearch.filter((elem) =>
		`${elem.name.first}${elem.name.last}`.toLowerCase().includes(searchValue.toLowerCase())
	);
};

function creatingProfileCard({picture, name, email, dob, phone, location, gender}) {
    return `
        <div class='content__item'>
            <img class='content__item-img' src='${picture.medium}'>
            <div class='content__item-name'>${name.title} ${name.first} ${name.last}</div>
            <p class='content__item-p content__item-email'>
                <a class='content__item-a' href="mailto:  ${email}"   target="_blank"> ${email}</a>
            </p>
            <p class='content__item-p'>Age: ${dob.age}</p>
            <a class='content__item-a' href='${phone}'>${phone}</a>
            <p class='content__item-p content__item-country'>${location.country}, ${location.city}</p>
            <div class='content__item-gender'>${gender}</div>
        </div>
    `;
}

function init() {
    renderAllItemsToPage(friends);

    document.querySelector('.asideBlock').addEventListener('input', ({target}) => {
        if (target.name === 'gender') {
            filterState.gender = target.id;
        }
    
        if (target.name === 'search') {
            filterState.search = target.value;
        }
    
        if (target.name === 'sort') {
            filterState.sort = target.id;
        }
    
        render();
    });

    document.querySelector('#reset').addEventListener('click', function() {
        ageForm.reset();
        genderForm.reset();    
        filterState.reset();
        search.value = '';
        friendsCopy = [...friends];
        render();
    })
}

function render() {
    friendsCopy = [...friends];
    
    if (filterState.gender) {
        friendsCopy = filterByGender(filterState.gender, friendsCopy);
    }

    if (filterState.sort) {
        friendsCopy = sortBy(filterState.sort, friendsCopy);
    }

    if (filterState.search) {
        friendsCopy = filterBySearch(filterState.search, friendsCopy);
    }
    
    renderAllItemsToPage(friendsCopy);
}

function renderAllItemsToPage(arr) {
    content.innerHTML = '';

    let acc = '';
    arr.forEach(item => {
        acc += creatingProfileCard(item);
    });

    content.innerHTML = acc;
}

getData(url);
