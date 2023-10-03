const createUserForm = document.querySelector('.create-user-form')
const createUserFormButton = document.querySelector('.create-user-form-btn');
const createUserFormWindow = document.querySelector('.create-user-form-window');
const exerciseForm = document.getElementById("exercise-form");


function closeCreateUserForm(event){
    createUserFormWindow.classList.toggle('open');
    event.target.removeEventListener('click', closeCreateUserForm);
}

function openCreateUserForm(event){
    

    document.querySelector('.js-close-create-user-form-window-btn')
    .addEventListener('click', closeCreateUserForm);

    createUserFormWindow.classList.toggle('open');
};

function submitCreateUserForm(){

    createUserFormWindow.classList.toggle('open');
    
    createUserForm.submit();
}

function submitExerciseForm(){
    const userId = document.getElementById("uid").value;
        const userDate = document.getElementById("date");

        if(userDate.value === ""){
            const date = new Date();
            userDate.value = date.toDateString();
        }

        exerciseForm.action = `/api/users/${userId}/exercises`;

        exerciseForm.submit();
};

function initializeApplication(){

    createUserFormButton.addEventListener('click', openCreateUserForm);

    createUserForm.addEventListener('submit', submitCreateUserForm);

    exerciseForm.addEventListener("submit", submitExerciseForm);

    console.log('Initialized')
};

initializeApplication();