const url = "https://pokeapi.co/api/v2/pokemon";

const nameInput = document.querySelector("#nameInput");
const search = document.querySelector("#search");

const pkmname = document.querySelector("#pkmName");
const pkmid = document.querySelector("#pkmId");
const pkmsprite = document.querySelector("#pkmSprite");

const hp = document.querySelector("#hp");
const attack = document.querySelector("#attack");
const defense = document.querySelector("#defense");
const spAttack = document.querySelector("#spAttack");
const spDefense = document.querySelector("#spDefense");
const speed = document.querySelector("#speed");

const hpValue = document.querySelector("#hpValue");
const attackValue = document.querySelector("#attackValue");
const defenseValue = document.querySelector("#defenseValue");
const spAttackValue = document.querySelector("#spAttackValue");
const spDefenseValue = document.querySelector("#spDefenseValue");
const speedValue = document.querySelector("#speedValue");

async function fetchPokemon(name) {
  const r = await fetch(`${url}/${name}`);
  if (r.status === 200) {
    return r.json();
  }
  throw new Error("Pokemon não encontrado");
}

function title(string) {
  return string.charAt(0).toUpperCase() + string.substring(1).toLowerCase();
}

function setPokemon(pokemon) {
  pkmname.innerText = title(pokemon.name);
  pkmid.innerText = "ID: " + pokemon.id;
  pkmsprite.src = pokemon.sprites.front_default;

  pkmsprite.onclick = () => {
    const cry = new Audio(
      pokemon.cries.legacy ? pokemon.cries.legacy : pokemon.cries
    );
    cry.volume = 0.5;
    cry.play();
  };

  hp.value = pokemon.stats[0].base_stat;
  hpValue.innerText = pokemon.stats[0].base_stat;
  attack.value = pokemon.stats[1].base_stat;
  attackValue.innerText = pokemon.stats[1].base_stat;
  defense.value = pokemon.stats[2].base_stat;
  defenseValue.innerText = pokemon.stats[2].base_stat;
  spAttack.value = pokemon.stats[3].base_stat;
  spAttackValue.innerText = pokemon.stats[3].base_stat;
  spDefense.value = pokemon.stats[4].base_stat;
  spDefenseValue.innerText = pokemon.stats[4].base_stat;
  speed.value = pokemon.stats[5].base_stat;
  speedValue.innerText = pokemon.stats[5].base_stat;
}

function handleSearchPokemon(name) {
  pkmname.innerText = "Carregando...";
  pkmid.innerText = "só um segundo!";
  fetchPokemon(name)
    .then(setPokemon)
    .catch((e) => {
      pkmname.innerText = "Digite um pokemon";
      pkmid.innerText = "e aperte enter!";
      alert(e);
    });
}

nameInput.onkeypress = (e) => {
  if (e.key === "Enter") {
    const name = nameInput.value.toLowerCase();
    handleSearchPokemon(name);
  }
};

search.onclick = () => {
  const name = nameInput.value.toLowerCase();
  handleSearchPokemon(name);
};
