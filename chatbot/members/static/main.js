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

function askgemini() {
    let user_query = document.getElementById('query').value;

    // Fetch the API key from Django view
    fetch('/get-api-key/')
        .then(response => response.json())
        .then(data => {
            if (data.apiKey) {
                const apiKey = data.apiKey;

                // Use the API key in your request to Gemini API
                fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        "contents": [{
                            "parts": [{
                                "text": user_query
                            }]
                        }]
                    })
                })
                .then((response) => response.json())
                .then((data) => {
                    document.getElementById('response').innerText = data.candidates[0]?.content?.parts[0]?.text || 'No content available';
                })
                .catch(error => {
                    console.error('Error calling Gemini API:', error);
                    document.getElementById('response').innerText = 'Error calling the Gemini API';
                });
            } else {
                console.error('API key not found');
                document.getElementById('response').innerText = 'API key not found';
            }
        })
        .catch(error => {
            console.error('Error fetching the API key:', error);
            document.getElementById('response').innerText = 'Error fetching API key';
        });
}