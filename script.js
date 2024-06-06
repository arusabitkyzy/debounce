const API_KEY = 'a8e172cb';
const input = document.querySelector('.input');
const resultedFilms = document.querySelector('.films');

const handleChange = debounce(fetchData, 2000);

async function fetchData() {
  if (input.value == '') {
    resultedFilms.innerHTML = '';
    return;
  }

  let response = await fetch(
    `http://www.omdbapi.com/?apikey=${API_KEY}&t=${encodeURIComponent(
      input.value
    )}`
  );
  let result = await response.json();

  const film = document.createElement('li');
  film.innerHTML = `${result.Title}`;
  resultedFilms.appendChild(film);
}

function debounce(fn, delay) {
  let timer;
  clearTimeout(timer);

  return () => {
    timer = setTimeout(fn, delay);
  };
}

input.addEventListener('keyup', handleChange);
