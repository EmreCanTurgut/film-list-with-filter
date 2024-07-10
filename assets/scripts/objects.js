const addMovieBtn = document.getElementById("add-movie-btn");
const searchBtn = document.getElementById("search-btn");

const movies = [];


const deleteModal=(id)=>{


  let movieIndex = 0;
  for (const movie of movies) {
    if (movie.id === id) {
      break;
    }
    movieIndex++;
  }
  movies.splice(movieIndex, 1); // o indexteki değeri arrayden siler
  console.log(movies);

  movieList.children[movieIndex].remove(); // o indextekideğeri html listesinden siler

}
const movieList = document.getElementById("movie-list");

const renderMovies = (filter = "") => {
  /* filtera değer girilmezse "" boş değeri atanır (0) a eşittir !0 1 oludugu için filtreleme yapılmaz
   değer girilince ! hep false verir filtreleme yapılır
*/

  if (movies.length === 0) {
    movieList.classList.remove("visible");
    return;
  } else {
    movieList.classList.add("visible");
  }
  movieList.innerHTML = "";

  const filteredMovies = !filter
    ? movies
    : movies.filter((movie) =>{
     return movie.info.title.includes(filter)
      });  
      // movie movies arrayının içindeki değerleri sıra ile döndürüyo
      // include true false döndürür eğer true döndürcek bi değer dönerse filter o değeri kabul der

  filteredMovies.forEach((movie) => {
    const movieEL = document.createElement("li");
    let text = movie.getFormattedTitle() + " - ";


    for (const key in movie.info) {
      if (key !== "title") {
        text = text + `${key}:${movie.info[key]}`;
      }
    }
    movieEL.textContent = text;
    movieList.append(movieEL);

    movieEL.addEventListener('click',deleteModal.bind(this,movie.id));

  });
};

  const addMovieHandler = () => {
  const title = document.getElementById("title").value;
  const extraName = document.getElementById("extra-name").value;
  const extraValue = document.getElementById("extra-value").value;

  if (
    title.trim() === "" ||
    extraName.trim() === "" ||
    extraValue.trim() === ""
  ) {
    return;
  }
  const newMovie = {
    info: {
      title,
      [extraName]: extraValue,
    },
    id: Math.random(),  
    getFormattedTitle: function () {
        return this.info.title.toUpperCase(); 
    }

  };
  movies.push(newMovie);
  renderMovies();
  console.log(movies);
  
};

const searcMovieHandler = () => {
  const filterTerm = document.getElementById("filter-title").value;
  renderMovies(filterTerm);
};

addMovieBtn.addEventListener("click", addMovieHandler);
searchBtn.addEventListener("click", searcMovieHandler);


