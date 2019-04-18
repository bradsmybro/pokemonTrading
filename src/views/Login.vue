<template>
  <div>
    <h1>Login to your account</h1>
    <form @submit.prevent="login" class="pure-form pure-form-aligned">
      <fieldset>
        <p class="pure-form-message-inline text">All fields are required.</p>

        <div class="pure-control-group">
          <label for="username">Username</label>
          <input class="form-text" v-model="username" type="text" placeholder="Username">
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
</template>

<script>
export default {
  name: "login",
  data() {
    return {
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
  methods: {
    async login() {
      try {
        this.error = await this.$store.dispatch("login", {
          username: this.username,
          password: this.password
        });
        if (this.error === "") this.$router.push({ name: "userProfile" });
        //this.$router.push({ name: "Profile", params: { id: this.user._id } });
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