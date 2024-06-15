//handles user logout process
async function logout () {
    //post request to logout endpoint to terminate user session
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    //if response status is okay redirect to homepage, if not display an alert
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
}

//attach event listener to loguot button (when clicked logout function is called)
document.querySelector('#logout').addEventListener('click', logout);