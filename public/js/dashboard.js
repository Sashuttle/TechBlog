const deletePostHandler = async (event) => {
    console.log(event.target);

    //Note: Get the postId from the data attribute of the clicked element
    let postId = event.target.getAttribute('data-id');
    console.log(postId);

    //Note: send delete request
    const response = await fetch(`/api/post/${postId}`, {
        method: "DELETE",
    });

    if (response.ok) {
        document.location.assign(`/dashboard`);
    } else {
        alert(response.statusText);
    }
};

const editPost = async (event) => {
    event.preventDefault();
    console.log('Click');

    //Note: get postId from data attribute
    let postId = event.target.getAttribute('data-id');
    document.location.assign(`/create/${postId}`);
};


const editButton = document.querySelector('#editBtn');

//Note: add event listener to edit button
for(let i = 0; i < editButton.clientHeight; i++) {
    editButton[i].addEventListener('click', editPost);
}

const deleteButton = document.querySelector('#deleteBtn');

//Note: add event listener to delete button
for (let i = 0; i < deleteButton.length; i++) {
    deleteButton[i].addEventListener('click', deletePostHandler);
}