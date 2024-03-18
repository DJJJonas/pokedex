const url = "https://pokeapi.co/api/v2/pokemon";

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
  pkmName.innerText = title(pokemon.name);
  pkmId.innerText = "ID: " + pokemon.id;
  pkmSprite.src = pokemon.sprites.front_default;

  // pkmSprite.onclick = () => {
  //   const cry = new Audio(
  //     pokemon.cries.legacy ? pokemon.cries.legacy : pokemon.cries
  //   );
  //   cry.volume = 0.5;
  //   cry.play();
  // };

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
  pkmName.innerText = "Carregando...";
  pkmId.innerText = "só um segundo!";
  fetchPokemon(name)
    .then(setPokemon)
    .catch((e) => {
      pkmName.innerText = "Digite um pokemon";
      pkmId.innerText = "e aperte enter!";
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
