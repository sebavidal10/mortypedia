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
    div_char.className = 'col-6 col-md-2 p-3 text-white';

    let p_name = document.createElement('p');
    p_name.className = 'mb-2';
    if (char.name.length > 16) {
      p_name.textContent = char.name.substring(0, 16) + '...';
      p_name.setAttribute('data-toggle', `tooltip`);
      p_name.setAttribute('data-placement', `bottom`);
      p_name.setAttribute('title', `${char.name}`);
    } else {
      p_name.textContent = char.name;
    }
    div_char.appendChild(p_name);

    let img_char = document.createElement('img');
    img_char.className =
      'img-fluid mini-img shadow rounded border border-green-rm';
    img_char.src = char.image;
    div_char.appendChild(img_char);

    let p_char = document.createElement('p');
    p_char.className = 'text-right';
    p_char.textContent = char.status;
    div_char.appendChild(p_char);

    $('#files').append(div_char);
  }
  $('[data-toggle="tooltip"]').tooltip();
  $('#loading').addClass('d-none');
  $('#files').removeClass('d-none');
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
  ['Rick', 'Morty', 'Summer', 'Beth', 'Jerry'].forEach((name) => {
    let btn = document.createElement('button');
    btn.className = `btn bg-black p-2 pl-3 text-light mx-2 mb-3 rounded-pill`;
    btn.setAttribute('data-name', `btn-get-${name}`);
    btn.innerHTML = `${name}!`;

    let img = document.createElement('img');
    img.src = `./assets/img/${name}.gif`;
    img.alt = `${name} gif`;
    img.className = 'gif-banner rounded-circle ml-2 border border-light';
    img.setAttribute('data-name', `btn-get-${name}`);
    btn.appendChild(img);

    $('#buttons').append(btn);
  });

  $('#buttons').on('click', 'button', function (e) {
    $('#files').addClass('d-none');
    $('#loading').removeClass('d-none');
    let who = e.target.getAttribute('data-name').split('-')[2];
    getThe(who);
  });
});
