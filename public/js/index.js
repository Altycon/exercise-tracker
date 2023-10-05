

const createUserForm = document.querySelector('.create-user-form')
const createUserFormButton = document.querySelector('.create-user-form-btn');
const createUserFormWindow = document.querySelector('.create-user-form-window');

const exerciseForm = document.getElementById("exercise-form");
const exerciseFormDateInput = document.getElementById('date');

function closeCreateUserForm(event){
    createUserFormWindow.classList.toggle('open');
    event.target.removeEventListener('click', closeCreateUserForm);
}

function openCreateUserForm(){

    document.querySelector('.js-close-create-user-form-window-btn')
    .addEventListener('click', closeCreateUserForm);

    createUserFormWindow.classList.toggle('open');
};

function submitCreateUserForm(event){
    event.preventDefault();
    
    createUserFormWindow.classList.toggle('open');
    
    event.target.submit();
    event.target.reset();
};

function submitExerciseForm(event){
    event.preventDefault();

    const userId = document.getElementById("uid").value;
        const userDate = document.getElementById("date");
        const dateRegex = /\d{4}-\d{2}-\d{2}/;

        if(userDate.value === ""){

            const date = new Date();

            userDate.value = date.toDateString();

        }else if(!userDate.value.match(dateRegex)){

            userDate.focus();

            return;
        }


        exerciseForm.action = `/api/users/${userId}/exercises`;

        exerciseForm.submit();
        exerciseForm.reset();
};

function addFormListeners(){

    createUserFormButton.addEventListener('click', openCreateUserForm);

    createUserForm.addEventListener('submit', submitCreateUserForm);

    exerciseForm.addEventListener("submit", submitExerciseForm);
};

function initializeApplication(){

    addFormListeners();

    console.log('Initialized')
};

initializeApplication();