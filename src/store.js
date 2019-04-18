import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default new Vuex.Store({
  state: {
    user: null,
    userPokemon: [],
    pokemon: []
  },
  mutations: {
    setUser(state, user) {
      if (user == null) {
        state.userPokemon = [];
      }
      state.user = user;
    },
    setPokemon(state, pokemon) {
      state.pokemon = pokemon;
    },
    setUserPokemon(state, pokemon) {
      if (
        !Array.isArray(pokemon) &&
        typeof pokemon === "object" &&
        pokemon !== null
      ) {
        state.userPokemon = [];
        state.userPokemon.push(pokemon);
      } else {
        state.userPokemon = pokemon;
      }
    }
  },
  actions: {
    async login(context, data) {
      try {
        let response = await axios.post("/api/users/login", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async logout(context) {
      try {
        await axios.delete("/api/users");
        context.commit("setUser", null);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getUser(context) {
      try {
        let response = await axios.get("/api/users");
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return "";
      }
    },
    async register(context, data) {
      try {
        let response = await axios.post("/api/users", data);
        context.commit("setUser", response.data);
        return "";
      } catch (error) {
        return error.response.data.message;
      }
    },
    async getPokemon(context, data) {
      try {
        let response = await axios.get("/api/pokemon/" + data);
        context.commit("setUserPokemon", response.data);
        return true;
      } catch (error) {
        return error;
      }
    },
    async getSinglePoke(context, data) {
      try {
        let response = await axios.get(data.selected);
        response = response.data;
        let typeArray = [];
        let pic = "";
        let type;
        for (type in response.types) {
          typeArray.push(response.types[type].type.name);
        }

        pic = response.sprites.front_default;

        var temp = {
          poke: capitalize(response.forms[0].name),
          user: data.user,
          cp: data.cp,
          location: data.locCaught,
          type: typeArray,
          pic: pic
        };
        //call api here? No call in main
        return temp;
      } catch (error) {
        return error;
      }
      //that.upload(temp);
      //that.getPokemon(that.user);
      //that.pokemonCards.push(temp)
      //that.locCaught = "";
    },
    async uploadPoke(context, poke) {
      try {
        await axios.post("/api/pokemon/trade", {
          poke: poke.poke,
          user: poke.user,
          cp: poke.cp,
          type: poke.type,
          caught: poke.caught,
          path: poke.path
        });
      } catch (error) {
        return error.response.data.message;
      }
    },
    async deletePoke(context, data) {
      console.log("delete");
      try {
        await axios.delete("/api/pokemon/" + data);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async updatePoke(context, data) {
      console.log("update");
      try {
        await axios.put("/api/pokemon/" + data.idNum, {
          cp: data.cp,
          caught: data.caught
        });
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
    async listPokemon(context) {
      //create list of pokemon names api call is https://pokeapi.co/api/v2/pokemon
      let total = await axios.get("https://pokeapi.co/api/v2/pokemon");

      let data = await axios.get(
        "https://pokeapi.co/api/v2/pokemon/?limit=" + total.data.count
      );

      data = data.data;
      let poke;
      for (poke in data.results) {
        data.results[poke].text = capitalize(data.results[poke].name);
        data.results[poke].value = data.results[poke].url;
        delete data.results[poke].name;
        delete data.results[poke].url;
      }
      data.results.sort(function(a, b) {
        var textA = a.text.toUpperCase();
        var textB = b.text.toUpperCase();
        return textA < textB ? -1 : textA > textB ? 1 : 0;
      });

      context.commit("setPokemon", data.results);
      //that.pokemonList = data.results;
    }
  }
});
