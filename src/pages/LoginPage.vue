<template>
  <div id="login-form" class="card">
    <form>
      <h3><strong>Login</strong></h3>
      <a-input label="Username" v-model="form.username"></a-input>
      <a-input
        label="Password"
        v-model="form.password"
        type="password"
      ></a-input>

      <button @click="login" class="btn btn-secondary loginbtn">Login</button>
    </form>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapMutations("login", ["setUser", "setToken"]),
    async login(e) {
      e.preventDefault();
      const response = await fetch("http://localhost:5000/api/Auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: this.form.username,
          password: this.form.password,
        }),
      });

      // console.log(await response.status);
      if ((await response.status) == 401) {
        alert("User not found!");
      } else if ((await response.status) == 500) {
        alert("Internal server error");
      } else {
        const { token } = await response.json();

        if (token.length > 0 || token != undefined) {
          console.log(typeof token);
          this.setToken(token);
          localStorage.setItem("token", token);
          this.$store.commit("AUTHORIZE");
          const user = this.getProfile(this.form.username);
          this.setUser(user);
          console.log(user);
          localStorage.setItem("user", JSON.stringify(user));
          this.$router.push("/");
        } else {
          alert("User not found!");
        }
      }
    },
  },
  computed: {
    ...mapGetters("profiles", {
      getProfile: "GET_PROFILE",
    }),
  },
};
</script>

<style scoped>
#login-form {
  color: white;
  width: 25%;
  padding: 5%;
  padding-left: 5%;
  margin-left: 15%;
  background: #00353b;
}

@media only screen and (max-width: 600px) {
  #login-form {
    width: 62%;
  }
}
</style>
