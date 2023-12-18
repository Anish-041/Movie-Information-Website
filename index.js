document.addEventListener("DOMContentLoaded", () => {
    const searchForm = document.getElementById("search-form");
    // console.log(searchForm); 
    const searchInput = document.getElementById("search");
    // console.log(searchInput);
    const resultsContainer = document.getElementById("result");
    // console.log(resultsContainer);

    searchForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        const searchTerm = searchInput.value;

        const apikey = 'a7749a74';
        const apiEndpoint = `http://www.omdbapi.com/?s=${searchTerm}&apikey=${apikey}`;

        try {
            const response = await fetch(apiEndpoint);
            const data = await response.json();
            console.log(data);

            if (data.Response === "True") {
                const movies = data.Search;
                if (movies && movies.length > 0) {
                    const moviesList = movies.map(movie => `
                    <img id="imge" src="${movie.Poster}"><p>Movie Name:- ${movie.Title}</p><p> Year:- ${movie.Year}</p><hr>`);
                    resultsContainer.innerHTML = moviesList.join('');
                } else {
                    resultsContainer.innerHTML = "No Results Found";
                }
            } else {
                //console.log(data.response);
                resultsContainer.innerHTML = "Error1" + data.Error;
            }
        } catch (error) {
            console.error("Error fetching data: " , error);
        }
    })
})
