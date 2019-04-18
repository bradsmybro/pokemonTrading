<template>
  <div class="Home">
    <div class="container">
      <div class="card pokemon_card">
        <img class="card-image-top lead_image" :src="image" alt="Pokemon GO logo?">
        <div class="card-body">
          <div class="card-title">
            <p class="card-text center">
              Welcome! This site is dedicated to the popular mobile game Pokemon GO. In the
              future this site will help facilitate trading pokemon between users as well as allow trainers to
              show off their pokemon!
            </p>
            <p class="card-text center">
              Use the menu view to see those feature as well as a brief overview of Pokemon GO as
              well as some interesting facts about Pokemon GO and its community.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import goScreen from "../assets/goScreen.jpg";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      image: goScreen
    };
  }
};
</script>

<style scoped>
</style>
