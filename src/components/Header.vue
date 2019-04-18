<template>
  <div id="top">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <router-link to="/">
        <img :src="logo" alt="Home" class="logo_picture">
      </router-link>
      <button
        class="navbar-toggler dropdownPoke"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto justify-content-center">
          <li
            v-for="page in pageList"
            v-bind:class="{'page-item':true, 'active':(currentPage.includes(page.name.replace(/\s/g, '')))}"
          >
            <router-link :to="page.adr">{{page.name}}</router-link>
          </li>
          <li v-if="user != null">
            <a @click="logout" href="#top">Logout</a>
          </li>
          <li class="page-item:true" v-else>
            <router-link to="/create">Login</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
import logo from "../assets/pokeball.png";

export default {
  name: "poke-header",
  props: {
    currentPage: String
  },
  data() {
    return {
      logo: logo,
      pageList: [
        { name: "Home", adr: "/" },
        { name: "Trading", adr: "/trading" },
        { name: "Profile", adr: "/profile" },
        { name: "Interesting Facts", adr: "/facts" },
        { name: "About", adr: "/about" }
      ]
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    id() {
      if (this.user == null) {
        return "";
      } else {
        return this.user._id;
      }
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>

<style scoped>
</style>