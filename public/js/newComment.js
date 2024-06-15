async function newCommentHandler(event) {
    event.preventDefault();

    //NOte: get value of comment input field
    const comment_body = document.getElementById('comment').value.trim();
    const url = window.location.toString().split('/');
    const post_id = url[url.length - 1];

    //Note: make sure comment body i snot empty and send post request to create comment
    if (comment_body) {
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({ post_id, comment_body }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}

//Note: add event listener for comment form
console.log(document.getElementById('comment-form'));
document.getElementById('comment-form').addEventListener('submit', newCommentHandler);
