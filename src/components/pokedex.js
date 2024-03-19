import Modal from "./modal.js";
import "../types/pokemon.d.js";

export default class Pokedex {
  static defaultSpriteSrc =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png";

  static clear() {
    this.setName("Digite um pokemon");
    this.setId("e aperte enter!");
    this.setSprite(this.defaultSpriteSrc);
    this.setHP(rand(0, 255));
    this.setAttack(rand(0, 255));
    this.setDefense(rand(0, 255));
    this.setSpAttack(rand(0, 255));
    this.setSpDefense(rand(0, 255));
    this.setSpeed(rand(0, 255));
  }

  /**
   * @param {Pokemon} pokemon - The Pokemon object to set.
   */
  static setPokemon(pokemon) {
    this.clear();
    this.setName(titleCase(pokemon.name));
    this.setId(pokemon.id);
    this.setSprite(pokemon.sprites.front_default);
    this.setHP(pokemon.stats[0].base_stat);
    this.setAttack(pokemon.stats[1].base_stat);
    this.setDefense(pokemon.stats[2].base_stat);
    this.setSpAttack(pokemon.stats[3].base_stat);
    this.setSpDefense(pokemon.stats[4].base_stat);
    this.setSpeed(pokemon.stats[5].base_stat);
  }

  /**
   * @param {string} name
   */
  static setName(name) {
    pkmName.innerText = name;
  }

  /**
   * @param {number|string} id
   */
  static setId(id) {
    if (isNaN(Number.parseFloat(id))) {
      pkmId.innerText = id;
      return;
    }
    pkmId.innerText = "ID: " + id;
  }

  /**
   * @param {string} src
   */
  static setSprite(src) {
    pkmSprite.src = src;
    Modal.setImg(src);
  }

  /**
   * @param {number|string} value
   */
  static setHP(value) {
    hp.value = value;
    hpValue.innerText = value;
  }

  /**
   * @param {number|string} value
   */
  static setAttack(value) {
    attack.value = value;
    attackValue.innerText = value;
  }

  /**
   * @param {number|string} value
   */
  static setDefense(value) {
    defense.value = value;
    defenseValue.innerText = value;
  }

  /**
   * @param {number|string} value
   */
  static setSpAttack(value) {
    spAttack.value = value;
    spAttackValue.innerText = value;
  }

  /**
   * @param {number|string} value
   */
  static setSpDefense(value) {
    spDefense.value = value;
    spDefenseValue.innerText = value;
  }

  /**
   * @param {number|string} value
   */
  static setSpeed(value) {
    speed.value = value;
    speedValue.innerText = value;
  }
}

/**
 * @param {string} str
 * @returns string
 */
function titleCase(str) {
  function titleWord() {
    return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
  }

  return str.split(" ").map(titleWord).join(" ");
}

/**
 * @param {number} min
 * @param {number} max
 * @returns number
 */
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
