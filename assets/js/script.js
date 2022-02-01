const baseUrl = 'https://rickandmortyapi.com/api';
const request = async (url) => {
  try {
    const results = await fetch(url);
    if (results.status === 200) {
      return results.json();
    } else {
      throw new Error('La url no se encontro');
    }
  } catch (error) {
    console.error(`Ups!!!\nError: "${error.message}"`);
  } finally {
    console.log(`Request realizado ${new Date()}`);
  }
};

const getCharacter = async (name, currentPage = 1) => {
  const url = `${baseUrl}/character/?name=${name}&page=${currentPage}`;
  return request(url);
};

const showData = (data) => {
  for (let char of data) {
    let div_char = document.createElement('div');
    div_char.className = 'col-6 col-md-2 p-3';

    let name_char = document.createElement('h5');
    name_char.textContent = char.name;
    div_char.appendChild(name_char);

    let img_char = document.createElement('img');
    img_char.className =
      'img-fluid mini-img shadow rounded border border-light';
    img_char.src = char.image;
    div_char.appendChild(img_char);

    let p_char = document.createElement('p');
    p_char.textContent = char.status;
    div_char.appendChild(p_char);

    $('#files').append(div_char);
  }
};

const getThe = async (who) => {
  $('#files').empty();
  let characters = await getCharacter(who);
  showData(characters.results);

  for (let i = 2; i <= characters.info.pages; i++) {
    characters = await getCharacter(who, i);
    showData(characters.results);
  }
};

$(document).ready(function () {
  [
    'Rick',
    'Morty',
    'Summer',
    'Beth',
    'Jerry',
    'Squanch',
    'Birdperson',
    'Tammy',
  ].forEach((name) => {
    let btn = document.createElement('button');
    btn.className = `btn bg-black p-2 pl-3 text-white mx-2 mb-3 rounded-pill`;
    btn.setAttribute('data-name', `btn-get-${name}`);
    btn.innerHTML = `${name}!`;

    let img = document.createElement('img');
    img.src = `./assets/img/${name}.gif`;
    img.alt = `${name} gif`;
    img.className = 'gif-banner rounded-circle ml-2';
    img.setAttribute('data-name', `btn-get-${name}`);
    btn.appendChild(img);

    $('#buttons').append(btn);
  });

  $('#buttons').on('click', 'button', function (e) {
    let who = e.target.getAttribute('data-name').split('-')[2];

    getThe(who);
  });
});
