const API_KEY = "YOUR_BING_API_KEY";
const url = "https://api.bing.microsoft.com/v7.0/news/search?q=";

async function fetchNews(query) {
    try {
        const response = await fetch(`${url}${query}`, {
            headers: {
                'Ocp-Apim-Subscription-Key': API_KEY
            }
        });
        if (!response.ok) {
            const errorData = await response.text();
            console.error(`Error fetching news: HTTP status ${response.status} - ${errorData}`);
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('API Response:', data);
        if (data && Array.isArray(data.value)) {
            bindData(data.value);
        } else {
            console.error('Invalid response structure:', data);
            alert('Unable to fetch news. Please try again later.');
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        alert('An error occurred. Please check the console for details.');
    }
}
