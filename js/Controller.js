pushRgbArray();
pushRgbArrayEmne();
showView();


function showText(ukeNr, emneNr) {

    writeUke(ukeNr, emneNr);
}

function showWeeks(emneNr){
    writeEmne(emneNr);
}

function deleteComment(button, id) {
  // Assuming you have an API endpoint like '/api/comments' for deleting comments
  axios.delete(apiUrl + "/" + id, {
    headers: {
      'x-functions-key': accessToken,  // Add the function key in the header
    }
  })
  .then(response => {
    console.log("Comment deleted successfully", response);
    // Remove the commentDiv from the DOM
    button.closest('.comment').remove();
  })
  .catch(error => {
    console.error("There was an error deleting the comment:", error);
  });
}

  function displayComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Clear existing comments

    comment.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.theComment}`;
        if(comment.Id === lastCommentAddedId)
          commentElement.innerHTML += `<button onclick="deleteComment(this, ${comment.Id})">Slett</button>`
        commentsContainer.appendChild(commentElement);
    });
}


  function getCommentsFromSQLAndDisplay() {

    // Make a GET request using Axios
    axios.get(apiUrl, {
        headers: {
          'x-functions-key': accessToken,  // Add the function key in the header
        }
      })
        .then(response => {
            // Handle the successful response
            comment = response.data; // The data from the response (should be the list of comments)
              console.log(comment)
            // Here you could process/display the comments in your app
            displayComments(); // Example of handling the comments
        })
        .catch(error => {
            // Handle any errors during the request
            console.error('There was an error fetching comments:', error);
        });
}

function postCommentToSQL(name, comment) {

    // Check if both name and content are provided
    if (name && comment) {
        const commentData = {
            name: name,
            theComment: comment
        };

        // Send POST request to backend API
        axios.post(apiUrl, commentData, {
            headers: {
              'x-functions-key': accessToken,  // Add the function key in the header
            }
          })
            .then(response => {
                // Handle success response
                console.log('Comment posted:', response.data);
                lastCommentAddedId = response.data.Id;
                // Optionally, you can refresh the list of comments
                getCommentsFromSQLAndDisplay(); // Fetch and display the comments again
            })
            .catch(error => {
                // Handle any error during the request
                console.error('Error posting comment:', error);
            });
    } else {
        alert('Vennligst legg igjen Navn og Kommentar.');
    }
}

