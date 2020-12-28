<template>
  <v-app>
    <v-main>
      <v-container class="container">
        <keep-alive>
          <Navbar v-if="enteredApp" />
        </keep-alive>
        <router-view> </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from "./components/Navbar";
import { mapState, mapActions } from "vuex";

export default {
  name: "App",

  components: {
    Navbar,
  },

  data: () => ({}),
  computed: {
    ...mapState(["enteredApp"]),
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

* {
  font-family: $style7;
}

a {
  text-decoration: none;
}

.container {
  margin-top: 20px;
}

/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: white;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: url("./assets/img/google-wall.jpg");
  background-position: top;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(170, 170, 170);
}
</style>
