<template>
  <div v-if="user == null">
    <h1>Register for an account</h1>
    <form @submit.prevent="register" class="pure-form pure-form-aligned">
      <fieldset>
        <p class="pure-form-message-inline text">All fields are required.</p>

        <div class="pure-control-group">
          <label for="name">Real Name</label>
          <input class="form-text" v-model="name" type="text" placeholder="Real Name">
        </div>

        <div class="pure-control-group">
          <label for="username">Username</label>
          <input v-model="username" type="text" class="form-text" placeholder="Username">
        </div>

        <div class="pure-control-group">
          <label for="password">Password</label>
          <input class="form-text" v-model="password" type="password" placeholder="Password">
        </div>

        <div class="pure-controls">
          <button type="submit" class="pure-button pure-button-primary">Submit</button>
        </div>
      </fieldset>
    </form>
    <p v-if="error" class="error">{{error}}</p>
  </div>
  <div v-else>
    <p class="text">You are already logged in</p>
  </div>
</template>

<script>
export default {
  name: "register",
  data() {
    return {
      name: "",
      username: "",
      password: "",
      error: ""
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    }
  },
  async created() {
    await this.$store.dispatch("getUser");
  },
  methods: {
    async register() {
      try {
        this.error = await this.$store.dispatch("register", {
          name: this.name,
          username: this.username,
          password: this.password
        });
        if (this.error === "")
          this.$router.push({ name: "Profile", params: { id: this.user._id } });
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.text {
  color: white;
}
.form-text {
  color: #4d4d4d;
}
form {
  border: 1px solid #ccc;
  background-color: #4d4d4d;
  border-radius: 4px;
  padding: 20px;
}
.pure-controls {
  display: flex;
}
.pure-controls button {
  margin-left: auto;
}
</style>