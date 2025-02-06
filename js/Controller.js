pushRgbArray();
pushRgbArrayEmne();
showView();


function showText(ukeNr, emneNr) {

    writeUke(ukeNr, emneNr);
}

function showWeeks(emneNr){
    writeEmne(emneNr);
}


function displayComment(name, comment) {
    const commentsContainer = document.getElementById('commentsContainer');

    // Create a new div for each comment
    const commentDiv = document.createElement('div');
    commentDiv.classList.add('comment');

    // Format the display with name and comment
    commentDiv.innerHTML = `<strong>${name}</strong>: ${comment}`;
    
    commentsContainer.appendChild(commentDiv); // Append the comment div to the container
  }


  function displayComments() {
    const commentsContainer = document.getElementById('commentsContainer');
    commentsContainer.innerHTML = ''; // Clear existing comments

    comment.forEach(comment => {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment');
        commentElement.innerHTML = `<strong>${comment.name}</strong>: ${comment.theComment}`;
        commentsContainer.appendChild(commentElement);
    });
}


  function getCommentsFromSQL() {

    // Make a GET request using Axios
    axios.get(apiUrl)
        .then(response => {
            // Handle the successful response
            comment = response.data; // The data from the response (should be the list of comments)
              
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
            Name: name,
            theComment: comment
        };

        // Send POST request to backend API
        axios.post(apiUrl, commentData)
            .then(response => {
                // Handle success response
                console.log('Comment posted:', response.data);
                
                // Optionally, you can refresh the list of comments
                getCommentsFromSQL(); // Fetch and display the comments again
            })
            .catch(error => {
                // Handle any error during the request
                console.error('Error posting comment:', error);
            });
    } else {
        alert('Vennligst legg igjen Navn og Kommentar.');
    }
}