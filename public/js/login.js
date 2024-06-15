//form submission event for login
async function loginFormHandler(event) {
    event.preventDefault();

    //get email and pw from form input fields
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    //check if both email and pw fields are filled
    if (email && password) {
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        });

        //if response is okay redirect and if it is not okay give error message
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            let result = await response.json()
            alert(result.message)
        }
    }
}

//event listener to the form that will trigger loginform handler funtion form submission
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);