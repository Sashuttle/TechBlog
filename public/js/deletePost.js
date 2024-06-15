//Note: prevent default form submission behavior
const deletePostHandler = async (event) => {
    event.preventDefault();
    console.log('Click');
    console.log(event.target);

    //Note: extract post ID
    let post = window.location.pathname.split('/');
    console.log(post);

    //Note: send delete request to delete the post
    const response = await fetch(`/api/post/${post[2]}`, {
        method: 'DELETE',
    });

    //Note: check if the request was successful
    if (response.ok) {
        document.location.assign(`/dashboard`);
    } else {
        alert(response.statusText);
    }
};

const deleteButton = document.querySelectorAll('#deleteBtn');

//Note: add event listener to the delete button
for (let i = 0; i < deleteButton.clientHeight; i++) {
    deleteButton[i].addEventListener('click', deletePostHandler);
}