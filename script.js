const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputbox');
// const movieNotFound = document.querySelector('.movie-not-found')

//fetch movie details
const getMovieInfo= async (movie) => {
    try{
        const myapikey = "fa5ff439";
        const url = `https://www.omdbapi.com/?apikey=${myapikey}&t=${movie}`;
    
        const response = await fetch(url);

        if(!response.ok){
            throw new Error("Unable to fetch movie data.");
        }
        const data = await response.json();
    
        showMovieData(data);

    }
    catch(error){

        movieContainer.innerHTML = "";
        movieContainer.classList.remove('movie-container');
        const movieNotFound = document.createElement('div');
        movieNotFound.classList.add('movie-not-found');
        movieNotFound.innerHTML = `<video  autoplay loop muted width="150px" height="150px"><source src="popcorn5.mp4" type="video/mp4"/></video> <h2>No Movie Found!!</h2>`;
        movieNotFound.style.display = "flex";
        movieContainer.appendChild(movieNotFound);

    }
}

//functon to show movie data on screen
const showMovieData = (data) => {

    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');



    //use Destructing Assignment to extract properties from data oject
    const {Title, imdbRating, Genre, Released, Runtime, Actors , Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');
    movieElement.innerHTML = `<h2>${Title}</h2>
    <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;
    const movieGenreElement = document.createElement('div');
    movieGenreElement.classList.add('movie-genre');
    
    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerHTML = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML += `<p><strong>📅 Released Date: </strong>${Released}</p>
    <p><strong>🕛 Duration: </strong>${Runtime}</p>
    <p><strong>🎭 Cast: </strong>${Actors}</p>
    <p><strong>🍿 Plot: </strong>${Plot}</p>`;

    //creating a div for movie poster
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`;
    movieContainer.appendChild(moviePosterElement);

    movieContainer.appendChild(movieElement);
}

//function to display error message
const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<video  autoplay loop muted width="150px" height="150px"><source src="GenAI.mp4" type="video/mp4"/></video> <h2>${message}</h2>`
        movieContainer.classList.add('noBackground');
}

// function to handle form submission
const handleFormSubmission = (e) =>{
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName!==''){
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get movie information");
        
    }
}

//adding event listener
searchForm.addEventListener('submit',handleFormSubmission);