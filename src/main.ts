import "./styles/style.scss";
import pokemonArray from "./data/pokemon"

const toProperCase = (string: string) => {
  return string.replace(/\w\S*/g, (txt) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
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
if (!pokeHeading) throw	new Error("Heading not found")
const input = document.createElement("input")
input.style.display = "block"
input.placeholder = "PokéSearch"
pokeHeading.appendChild(input)

const cardContainer = document.querySelector<HTMLDivElement>(".card-container")
if (!cardContainer) throw new Error("Card container not found")

pokemonArray.forEach(pokemon => {
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
})

