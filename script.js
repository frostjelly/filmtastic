let searchValue = "superman";
let searchMediaType = "movie";
let searchPageNumber = 1;
let apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=e0b9ee23&s=${searchValue}&type=${searchMediaType}&page=${searchPageNumber}`;
let charDiv = document.querySelector(".character-list__container");
let serachInfoHtml = document.querySelector(".search-results__info");
let charListData = [];

const fetchCharacterList = async () => {
  const res = await fetch(apiUrl);
  const data = await res.json();
  charListData = await data.Search;
  return charListData;
};

let selectMovieFilterValue = null;

const selectMovieFilter = e => {
  console.log(e.target.value);
  selectMovieFilterValue = e.target.value;
  renderCharacterList();
};

const renderCharacterHTML = () => {
  console.log(charListData);
  if (!charListData) {
    serachInfoHtml.innerHTML = "Sorry, search for something else.";
    return;
  }
  const charHtml = charListData
    .map(char => {
      if (char.Poster !== "N/A") {
        return `
    <div class="character__container">
      <a href="https://www.imdb.com/title/${char.imdbID}" target="_blank" class="character__link">
        <div class="character__row">
          <h2 class="character__name">${char.Title}</h2>
          <figure class="charcter__figure">
            <img src="${char.Poster}" alt="" class="character__img" />
            <h2 class="character__name--bottom">${char.Title}</h2>
            <h2 class="character__year">Year: ${char.Year}</h2>
          </figure>
        </div>
      </a>
    </div>

    `;
      }
    })
    .join("");

  charDiv.innerHTML = charHtml;
};

const loadingSearchResults = async () => {
  charDiv.innerHTML = `<div class="spinner__container">
  <h3 class="spinner-text">Loading</h3>
  <i class="fa-solid fa-spinner spinner loading"></i> 
</div>`;
};

const renderCharacterList = async () => {
  console.log(charListData.length);
  if (charListData.length < 1) {
    loadingSearchResults();
    charListData = await fetchCharacterList();
  }
  switch (selectMovieFilterValue) {
    case "Year: High to Low":
      charListData = charListData.sort((a, b) => b.Year - a.Year);
      console.log("Hight to Low!!!");
      break;
    case "Year: Low to High":
      charListData = charListData.sort((a, b) => a.Year - b.Year);
      console.log("Low to Hight!!!");
      break;
    default:
      break;
  }
  renderCharacterHTML();
};

renderCharacterList();

const searchCharacter = async e => {
  e.preventDefault();
  searchValue = e.target["character-search"].value;
  console.log(e);
  apiUrl = `http://www.omdbapi.com/?i=tt3896198&apikey=e0b9ee23&s=${searchValue}}&type=${searchMediaType}&page=${searchPageNumber}`;
  console.log(apiUrl);
  if (searchValue !== "") {
    console.log(searchValue);

    serachInfoHtml.innerHTML = `Searching for: "${searchValue}"`;
    loadingSearchResults();
    await fetchCharacterList();
    console.log(charListData);
    if (charListData === undefined) {
      serachInfoHtml.innerHTML = `Sorry, no results. Try again.`;
      charDiv.innerHTML = "";
    }
    renderCharacterList();
  }
};

// const pageBack = e => {
//   if (searchPageNumber > 1) {
//     --searchPageNumber;
//     renderCharacterList();
//   }
//   console.log("Page Number = ", searchPageNumber);
// };

// const pageForward = e => {
//   if (charListData.length === 10) {
//     ++searchPageNumber;
//     renderCharacterList();
//   }
//   console.log("Page Number = ", searchPageNumber);
// };
