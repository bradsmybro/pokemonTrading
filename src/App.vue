<template>
  <div id="app">
    <Header :currentPage="this.$route.name"></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from "@/components/Header.vue";

export default {
  name: "app",
  components: {
    Header
  }
};
</script>

<style>
.pokemon_card {
  margin-top: 15px;
  border-color: #4d4d4d !important;
  background-color: #4d4d4d !important;
}

body {
  background-color: #4d4d4d !important;
  color: white;
}

.trade_red {
  border-color: red !important;
  border-width: 4px !important;
}

.trade_blue {
  border-color: blue !important;
  border-width: 4px !important;
}

.bg-light {
  background-color: #1a1a1a !important;
}

.logo_picture {
  height: 30px;
}

.router-link-active a {
  color: red !important;
  font-weight: bold;
}

.navbar-light .navbar-nav .nav-link {
  color: white;
}

.footer {
  background-color: #1a1a1a;
}

.footer a {
  text-decoration: none;
  color: white;
  padding: 12px;
}

.lead_image {
  width: auto;
  object-fit: cover;
  height: 400px;
  border-radius: 5px;
  margin: 0 5rem;
}

.center {
  text-align: center;
  font-size: 18px;
}
.dropdownPoke {
  background-color: #4d4d4d !important;
}
</style>
