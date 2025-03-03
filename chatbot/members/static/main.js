function submit() {
    let user_query = document.getElementById('query').value;
    if (user_query.trim() === "") {
        document.getElementById('response').innerHTML = "Please enter a query.";
        return;
    }

    fetch(`/query?query=${encodeURIComponent(user_query)}`)
        .then((response) => response.json())
        .then((data) => {
            // Check if there's an error in the response
            if (data.error) {
                document.getElementById('response').innerHTML = `Error: ${data.error}`;
            } else {
                // Access the 'response' field in the data and display it
                document.getElementById('response').innerHTML = `DialoGPT: ${data.response}`;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('response').innerHTML = 'Error occurred while sending the request.';
        });
}