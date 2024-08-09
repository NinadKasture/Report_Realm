    const API_KEY = "1d3a0eefa97b499d8fbc4ee93eeb40b7";
    const url = "https://newsapi.org/v2/everything?q=";

    window.addEventListener("load", () => fetchNews("India"));

    function reload() {
        window.location.reload();
    }

    async function fetchNews(query) {
        try {
            const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const data = await res.json();
            console.log('API Response:', data); // Log the response
            if (data && Array.isArray(data.articles)) {
                bindData(data.articles);
            } else {
                console.error('Invalid response structure:', data);
                // Optionally, provide feedback to the user
                alert('Unable to fetch news. Please try again later.');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            // Optionally, provide feedback to the user
            alert('An error occurred. Please check the console for details.');
        }
    }
    

    function bindData(articles) {
        const cardsContainer = document.getElementById("cards-container");
        const newsCardTemplate = document.getElementById("template-news-card");

        cardsContainer.innerHTML = "";

        articles.forEach((article) => {
            if (!article.urlToImage) return;
            const cardClone = newsCardTemplate.content.cloneNode(true);
            fillDataInCard(cardClone, article);
            cardsContainer.appendChild(cardClone);
        });
    }

    function fillDataInCard(cardClone, article) {
        const newsImg = cardClone.querySelector("#news-img");
        const newsTitle = cardClone.querySelector("#news-title");
        const newsSource = cardClone.querySelector("#news-source");
        const newsDesc = cardClone.querySelector("#news-desc");

        newsImg.src = article.urlToImage;
        newsTitle.innerHTML = article.title;
        newsDesc.innerHTML = article.description;

        const date = new Date(article.publishedAt).toLocaleString("en-US", {
            timeZone: "Asia/Jakarta",
        });

        newsSource.innerHTML = `${article.source.name} · ${date}`;

        cardClone.firstElementChild.addEventListener("click", () => {
            window.open(article.url, "_blank");
        });
    }

    let curSelectedNav = null;
    function onNavItemClick(id) {
        fetchNews(id);
        const navItem = document.getElementById(id);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = navItem;
        curSelectedNav.classList.add("active");
    }

    const searchButton = document.getElementById("search-button");
    const searchText = document.getElementById("search-text");

    searchButton.addEventListener("click", () => {
        const query = searchText.value;
        if (!query) return;
        fetchNews(query);
        curSelectedNav?.classList.remove("active");
        curSelectedNav = null;
    });