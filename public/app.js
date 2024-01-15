const createForm = document.querySelector('#createForm');
let createUser = document.querySelector('#createUser');
let createContent = document.querySelector('#createContent');



createForm.addEventListener('submit', (e) => {
    if ((!createUser.value) || (!createContent.value)) {
        e.preventDefault();
        alert('Please enter a username and comment!');
    }
});


