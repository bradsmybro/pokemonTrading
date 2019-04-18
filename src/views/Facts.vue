<template>
  <div class="Interesting Facts">
    <div class="container">
      <div class="card pokemon_card">
        <div class="row bottom_spacing">
          <img
            class="card-image-top facts_title mx-auto my-2 bottom_spacing"
            :src="logo"
            alt="Insert Picture here"
          >
        </div>
        <div class="row bottom_spacing">
          <div class="col my-auto mx-auto">
            <img class="card-image-right facts_img mx-2 my-1" :src="bike" alt="Insert Picture here">
          </div>
          <div class="col my-auto">
            <div class="card-body">
              <p class="card-text center">
                Pokemon GO is a game that has experienced widespread popularity across the world!
                Below are some interesting facts about this almost three year old game.
              </p>
              <p class="card-text center">
                Pokemon GO was so popular in the months after it was released that more than just their
                servers where overloaded. In Provo, Utah due to four pokemon stops being placed close together in the game
                the library lawn was packed full of players daily. Sadly as announced
                <a
                  href="http://www.provolibrary.com/blog/1250-riley"
                >here</a> so many people were playing that it became a
                strain on the library and they had to request that the Pokemon GO stops be removed.
              </p>
            </div>
          </div>
        </div>
        <div class="row bottom_spacing">
          <div class="col my-auto">
            <div class="card-body">
              <p
                class="card-text center"
              >As of May 2018 Pokemon go has been downloaded over 800 million times.</p>
              <!--Source https://www.pocketgamer.biz/news/68209/pokemon-go-captures-800-million-downloads/ -->
              <p class="card-text center">
                There are multiple enourmous gatherings of fans that take place across the world
                throughout the world. Called Safari Zones they are extremely popular with event appearing in America,
                Europe, Asia, and recently South America! Attendees get to experience increased rates of pokemon appearance as
                well as meeting thousands of other Pokemon GO players.
              </p>
            </div>
          </div>
          <div class="col my-auto">
            <img
              class="card-image-left facts_img mx-2 my-1"
              :src="safari"
              alt="Insert Picture here"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import goLogo from "../assets/PokemonGoLogo.png";
import bikeCatching from "../assets/bikeCatching.jpg";
import safariZone from "../assets/safariZone.jpg";

export default {
  name: "Interesting Facts",
  components: {},
  data() {
    return {
      safari: safariZone,
      bike: bikeCatching,
      logo: goLogo
    };
  }
};
</script>

<style scoped>
</style>
