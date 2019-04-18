<template>
  <div class="container">
    <div v-if="user!=null" class="card pokemon_card profile_card">
      <div class="row">
        <div class="col-lg-4">
          <img
            class="card-image-top m-2"
            style="width:100%"
            :src="profilePic"
            alt="Profile picture"
          >
        </div>
        <div class="col-lg-8">
          <div class="card-body">
            <ul class="list-group">
              <li class="list-group-item user_list_black">Name: {{user.name}}</li>
              <li class="list-group-item user_list_black">Username: {{user.username}}</li>
            </ul>
          </div>
        </div>
      </div>
      <div class="trading_area col-lg-8">
        <p class="text">Pokemon I am willing to trade</p>
        <p></p>
        <p
          class="text"
          v-if="pokemonTrade.length === 0"
        >Go to the trading page to list what pokemon you are willing to trade!</p>
        <b-row>
          <template v-for="poke in pokemonTrade">
            <div>
              <poke-card :poke="poke" color="red"></poke-card>
            </div>
          </template>
        </b-row>
      </div>
    </div>
    <p v-else>Please login above</p>
  </div>
</template>

<script>
import oldGuy from "../assets/oldGuy.jpg";
import PokeCard from "@/components/PokeCard.vue";

export default {
  name: "Profile",
  components: {
    PokeCard
  },
  data() {
    return {};
  },
  computed: {
    profilePic() {
      return oldGuy;
    },
    user() {
      return this.$store.state.user;
    },
    pokemonTrade() {
      return this.$store.state.userPokemon;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
    await this.$store.dispatch("getPokemon", this.user._id);
  }
};
</script>

<style scoped>
.facts_list_blue {
  border-color: blue;
  border-width: 2px;
}
.facts_list_red {
  border-color: red;
  border-width: 2px;
}
.profile_card {
  color: black;
}
.user_list_black {
  border-color: #000;
  border-width: 1px;
}
.pokemon_card {
  margin-top: 15px;
  border-color: #4d4d4d !important;
  background-color: #4d4d4d !important;
}

.trading_card {
  margin: 15px 0px;
}

.trading_area {
  height: 400px;
  border-width: 3px !important;
  color: black;
}

.page_spacing {
  padding: 1rem;
}

.extra_margin {
  margin-top: 20px;
  margin-bottom: 20px;
}

.card-body h2 {
  text-align: center;
}
.text {
  color: white;
}
</style>