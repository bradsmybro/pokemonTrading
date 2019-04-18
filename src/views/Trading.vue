<template>
  <div class="trading">
    <b-container>
      <b-card title="Trading" class="pokemon_card">
        <b-card-text>
          <em class="text-center">Here is where you can trade Pokemon with other users!</em>
        </b-card-text>
        <b-form @submit="addCard">
          <b-form-group id="buildpokemon" label="Please add your tradable Pokemon">
            <b-row>
              <b-col lg="4" class="my-2">
                <b-form-select v-model="selected" :options="pokemonList" required/>
              </b-col>
              <b-col lg="3" class="my-2">
                <b-form-input v-model="cp" placeholder="Enter your pokemons CP" required/>
              </b-col>
              <b-col lg="4" class="my-2">
                <b-form-input v-model="locCaught" placeholder="Where was your pokemon caught?"/>
              </b-col>
            </b-row>
            <b-row class="my-2 ml-1">
              <b-button variant="dark" type="submit">Submit</b-button>
            </b-row>
          </b-form-group>
        </b-form>
        <b-row>
          <b-col>
            <p>Your Pokemon</p>
            <div class="trading_area overflow-auto">
              <b-row>
                <div v-for="poke in pokemonCards">
                  <poke-card v-on:edit-poke="editPoke" :poke="poke" color="red"></poke-card>
                </div>
              </b-row>
            </div>
          </b-col>
          <b-col>
            <p>Bob's Pokemon</p>
            <div class="trading_area overflow-auto">
              <b-row>
                <div v-for="poke in pokemonTrade">
                  <poke-card :poke="poke" color="blue"></poke-card>
                </div>
              </b-row>
            </div>
          </b-col>
        </b-row>
      </b-card>
      <div class="trading_area">
        <!-- Modal Component -->
        <b-modal ref="editModal" id="modal-1" :hide-footer="true" title="Edit Pokemon Entry">
          <poke-edit @get-poke="getPokemon(user._id)" :poke="editPokemon" color="red"/>
        </b-modal>
      </div>
    </b-container>
  </div>
</template>

<script>
import PokeCard from "@/components/PokeCard.vue";
import PokeEdit from "@/components/PokeEdit.vue";
export default {
  name: "trading",
  components: {
    PokeCard,
    PokeEdit
  },
  data() {
    return {
      locCaught: "",
      cp: "",
      //   user: "",
      //   users: [
      //    { value: "", text: "Please select your account", disabled: true },
      //    { value: "Jane", text: "Jane" },
      //    { value: "John", text: "John" },
      //    { value: "Bob", text: "Bob" }
      //  ],
      selected: "",
      editPokemon: {},
      editPokeName: "",
      editCp: "",
      editCaught: "",
      pokemonTrade: [
        {
          cp: "2210",
          caught: "Provo, UT",
          poke: "Marowak",
          type: ["ground"],
          path:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/105.png"
        },
        {
          cp: "1",
          caught: "Seoul, Korea",
          type: ["water"],
          poke: "Magicarp",
          path:
            "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/129.png"
        }
      ]
    };
  },
  //  watch: {
  //   user(newUser) {
  //     this.getPokemon(newUser);
  //   }
  // },
  computed: {
    user() {
      return this.$store.state.user;
    },
    pokemonList() {
      return this.$store.state.pokemon;
    },
    pokemonCards() {
      return this.$store.state.userPokemon;
    }
  },
  async created() {
    this.listPokemon();
    await this.$store.dispatch("getUser");
    this.getPokemon(this.user._id);
  },
  methods: {
    //need to rewrite api calls in store
    async listPokemon() {
      //create list of pokemon names api call is https://pokeapi.co/api/v2/pokemon
      await this.$store.dispatch("listPokemon");
    },
    async addCard(e) {
      e.preventDefault();
      let that = this;
      //Will add a card object to the pokemon card list
      console.log("Adding card", this.user);
      let data = {
        selected: this.selected,
        user: this.user._id,
        cp: this.cp,
        locCaught: this.locCaught
      };

      let temp = await this.$store.dispatch("getSinglePoke", data); //store call here
      that.upload(temp); //STORE CALL HERE
      that.getPokemon(that.user._id);
      //that.pokemonCards.push(temp)
      that.selected = "";
      that.cp = "";
      that.locCaught = "";
    },
    async getPokemon(user) {
      await this.$store.dispatch("getPokemon", user);
    },
    async upload(poke) {
      console.log(poke);
      let r1 = {
        poke: poke.poke,
        user: poke.user,
        cp: poke.cp,
        type: poke.type,
        caught: poke.location,
        path: poke.pic
      };
      await this.$store.dispatch("uploadPoke", r1);
    },
    editPoke(poke) {
      console.log("Edit the poke!");
      this.editPokemon = poke;
      this.$root.$emit("bv::show::modal", "modal-1");
    },
    capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }
};
</script>

<style scoped>
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
</style>
