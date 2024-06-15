//Note: This will allow users to edit any posts from the post page
let Post = window.location.pathname.split('/');

const submitEdit = async (event) => {
    event.preventDefault();

    //Note: get values of title and description input fields
    const title = document.getElementById('titleInput').value;
    const description = document.getElementById('bodyInput').value;

    //Note: if title and description are provided send a put request
    if (title && description) {
        const response = await fetch(`/api/Post/${Post[2]}`, {
            method: "PUT",
            body: JSON.stringify({ title, description }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log(response);
        if (response.ok) {
            document.location.assign('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}; 

const submitButton = document.getElementById('submitEdit');

//Note add event listener that triggers submit edit function
submitButton.addEventListener('submit', submitEdit);