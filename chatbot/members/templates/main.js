function submit() {
    let user_query = document.getElementById('query');
    fetch(`/query?query=${user_query.value}`)
        .then((response) => response.json())
        .then((data) => document.getElementById('response').innerHTML = data)
        .catch(error => console.error('Error:', error));
}

function askgemini() {
    let user_query = document.getElementById('query').value;
    fetch('/get-api-key')
        .then(response => response.json())
        .then(data => {
            const apiKey = data.apiKey; 
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
                document.getElementById('response').innerHTML = data.candidates[0].content.parts[0].text;
            })
            .catch(error => console.error('Error:', error));
        })
        .catch(error => console.error('Error fetching API key:', error));
}