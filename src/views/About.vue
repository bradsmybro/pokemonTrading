<template>
  <div class="about">
    <div class="container">
      <div class="card pokemon_card">
        <img class="card-image-top" :src="play" alt="Pokemon GO playing">
        <div class="card-body">
          <div class="card-title">
            <p class="card-text">
              Pokemon Go is a pioneer of augmented reality games. These games are similiar in concept
              to virtual reality but instead of placing the user into a completely virtual world the game instead shows pieces
              of itself into our world. For example in Pokemon GO you can use the camera on your phone to see pokemon in front of you as
              you walk from place ot place throughout your day
            </p>
            <p class="card-text">
              There are three important objects in the game that players need to interact with. Pokemon gyms
              are a place were players can put their strongest pokemon to keep control of it for as long as they can. The longer
              a player has a pokemon in a gym the greater their reward. Pokemon gyms are present at numerous local landmarks and
              popular locations. Pokestops are more common than gyms and are places to quickly gather a few in game items once every
              five minutes. They are also an easy place to get the third object, the pokemon themselves! They will appear on
              the map near the player and can then be clicked on to start the catching process.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goPlay from "../assets/pokemongoPlaying.jpg";
export default {
  data() {
    return {
      play: goPlay
    };
  }
};
</script>

<style scoped>
</style>


