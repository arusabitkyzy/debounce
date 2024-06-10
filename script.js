const API_KEY = 'a8e172cb';
const input = document.querySelector('.input');
const resultedFilms = document.querySelector('.films');

const handleChange = debounce(getMovie, 1000);

async function fetchData(movie) {
  let response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&t=${movie}`
  );
  let result = await response.json();
  if (result.Title) {
    showResults(result);
  }
}

function getMovie() {
  const movieInput = input.value;
  const movieEncoded = encodeURIComponent(input.value);
  if (movieInput.length <= 0) {
    resultedFilms.innerHTML = '';
    resultedFilms.innerHTML = `<h3>Please enter a film</h3>`;
  } else {
    console.log(movieEncoded);
    fetchData(movieEncoded);
  }
}

function showResults(result) {
  resultedFilms.innerHTML = '';
  resultedFilms.innerHTML = `
   <li>
     <div>
     ${result.Title}
     ${result.Year}
     </div>
     </li>
  `;
}

function debounce(fn, delay) {
  return function () {
    let timer;
    clearTimeout(timer);
    timer = setTimeout(fn, delay);
  };
}

input.addEventListener('keyup', handleChange);
