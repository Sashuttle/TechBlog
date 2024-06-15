async function newPostHandler(event) {
    event.preventDefault();

    //Note: get values from title & description from the input fields
    const title = document.querySelector('#titleInput').value.trim();
    const description = document.querySelector('#bodyInput').value.trim();

    //Note: check if both title & description are provided and send a post request
    if (title && description) {
        const response = await fetch(`/api/post`, {
            method: "POST",
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        //Note: check if response is okay, if so redirect to dashboard if not alert the user
        if(response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

//Note: add event listener to the form with createPost class
document.querySelector('.createPost').addEventListener('submit', newPostHandler);