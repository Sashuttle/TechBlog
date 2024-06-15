//Note: prevent default form submission behavior 
let post = window.location.pathname.split('/');

//Note: get post ID
const editPost = async (event) => {
    event.preventDefault();
    console.log('click');

//Note: get post body from input field
const post_body = document.getElementById('editBtn').value.trim();
console.log(post);
document.location.assign(`/create/${post[2]}`);
};

const editButton = document.querySelectorAll('#editBtn');

//Note: add event listener to edit button
for (let i = 0; i < editButton.length; i++) {
    editButton[i].addEventListener('click', editPost);
}