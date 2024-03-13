import "./styles/style.scss";
import { Pokemon } from "./data/types"
import pokemonArray from "./data/pokemon"

type State = {
  searchTerm: string,
  resultCount: number,
  typeFilter: string
}

let state: State = {
  searchTerm: "",
  resultCount: 10,
  typeFilter: "fire"
}

const toProperCase = (string: string) => {
  return string.replace(/\w\S*/g, (word) => {
    return word.charAt(0).toUpperCase() + word.substr(1).toLowerCase();
  });
};

const filterMatchesName = (searchItem: string, userSearch: string) => {
  if (userSearch === '') {
    return true
  } else if (searchItem.toLowerCase().includes(userSearch.toLowerCase())) {
    return true
  }
  return false
}

const pokeHeading = document.querySelector("h1")
if (!pokeHeading) throw new Error("Heading not found")

const cardContainer = document.querySelector<HTMLDivElement>(".card-container")
if (!cardContainer) throw new Error("Card container not found")

const searchInput = document.createElement("input")
searchInput.style.display = "block"
searchInput.placeholder = "PokéSearch"

const resultsNum = document.createElement("input")
resultsNum.type = "number"
resultsNum.style.display = "block"
resultsNum.placeholder = "How many results?"

const typeFilterInput = document.createElement("input")
typeFilterInput.placeholder = "Filter by type"
typeFilterInput.style.display = "block"

pokeHeading.after(searchInput, resultsNum, typeFilterInput)

resultsNum.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.value === "") {
    state = { ...state, resultCount: -1 }
  } else {
    state = { ...state, resultCount: Number(target.value) }
  }
  displayCards()
})

searchInput.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement
  state = { ...state, searchTerm: target.value }
  displayCards()
})

typeFilterInput.addEventListener("input", (event: Event) => {
  const target = event.target as HTMLInputElement
  state = { ...state, typeFilter: target.value }
  displayCards()
})

const displayCards = () => {
  cardContainer.innerHTML = ""
  let pokeDisplay: Pokemon[] = []

  for (let i = 0; i < pokemonArray.length; i++) {
    const pokemon = pokemonArray[i]
    if (!filterMatchesName(pokemon.name, state.searchTerm)) continue;
    pokeDisplay.push(pokemon)
  }

  if (state.typeFilter !== "") {
    pokeDisplay = pokeDisplay.filter(pokemon => {
			return pokemon.types.find(type => {
				return filterMatchesName(type, state.typeFilter)
				})
    })
  }

  for (let i = 0; state.resultCount >= 0 ? i < state.resultCount && i <= pokeDisplay.length : i <= pokeDisplay.length; i++) {
    const pokemon = pokeDisplay[i];
    const properName = toProperCase(pokemon.name);

    cardContainer.innerHTML += `
	<section class="card">
		<img class="card__image" src="${pokemon.sprite}" alt="">
			<div class="card__content">
			<h2 class="card__heading">${properName}</h2>
			<p class="card__text">${properName} (#${pokemon.id}) is a ${pokemon.types.join(" & ")} type pokemon.</p>
		</div>
	</section>
	`
  }
}

displayCards()
