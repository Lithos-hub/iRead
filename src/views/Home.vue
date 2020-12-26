<template>
  <div class="home">
    <div class="row align-items-center">
      <div class="col-lg-1" id="col-left"></div>
      <div class="col-lg-10" id="col-center">
        <div class="container-center">
          <router-link to="/main" style="text-decoration: none">
            <div id="title" class="text-center pt-5">
              <v-btn color="secondary" class="go-btn" @click="goApp()">Go</v-btn>
              <span id="i">i</span>
              <span id="r">R</span>
              <span id="e">e</span>
              <span id="a">a</span>
              <span id="d">d</span>
            </div>
          </router-link>
        </div>
      </div>

      <div class="col-lg-1" id="col-right"></div>
    </div>

    <v-footer class="transparent text-right" id="footer">
      {{ year }} - Carlos Segura García
    </v-footer>
    <p id="version" class="ma-auto align-content-end">
      Version: {{ version }}.{{ subversion }}
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Home",
  components: {},
  data() {
    return {
      year: new Date().getFullYear(),
      version: 1,
      subversion: 1,
    };
  },
  methods: {
    ...mapActions(["goApp"]),
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

* {
  font-family: $style7;
  overflow: hidden;
}

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  .home,
  body {
    height: 100% !important;
    width: 100% !important;
  }

  .home,
  body {
    position: absolute;
  }

  #i {
    position: relative;
    animation: move_i 3s ease-in-out;
    color: $googleBlue;
  }
  #r {
    position: relative;
    animation: move_r 4s ease-in-out;
    color: $googleRed;
  }
  #e {
    position: relative;
    animation: move_e 4s ease-in-out;
    color: $googleYellow;
  }
  #a {
    position: relative;
    animation: move_a 4s ease-in-out;
    color: $googleBlue;
  }
  #d {
    position: relative;
    animation: move_d 4s ease-in-out;
    color: $googleGreen;
  }

  .home {
    position: relative;
    height: 800px;
  }
  .main-container {
    margin: 0;
    position: absolute; /* 2 */
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 50%; /* 3 */
    transform: translate(0%, -50%); /* 4 */
  }

  #col-center {
    height: 900px;
  }

  .container-center {
    position: relative;
    top: 25%;
    left: 0%;
    transition: 1s;

    &:hover {
      cursor: pointer;

      #divider-flower {
        top: 50px;
      }

      #enter-btn {
        transition: 0.5s;
        filter: opacity(1);
      }
    }
  }

  .go-btn {
    box-shadow: 0px 2px 3px gray;
    position: absolute;
    left: 45%;
    top: 40%;
    opacity: 0;
    transition: 3s;
    width: 30px !important;
    height: 70px !important;
    background: url("../assets/img/google-wall.jpg");
    background-position: center;
    background-size: cover;
    color: $secondary !important;
    font-family: $style5 !important;
    font-size: 25px !important;
    font-weight: bold !important;
    &:hover {
      transform: scale(1.2);
      color: white !important;
    }
  }

  #title {
    font-size: 7em;
    animation: fade 2s ease-in-out;
    transition: 4s;
    &:hover {
      margin-left: 300px;
      #i {
        opacity: 0;
        transition: 3s;
        color: $googleBlue;
      }
      #r {
        transition: 3s;
        color: $googleBlue;
      }
      #e {
        transition: 3s;

        color: $googleGreen;
      }
      #a {
        transition: 3s;

        color: $googleRed;
      }
      #d {
        transition: 3s;

        color: $googleYellow;
      }

      .go-btn {
        opacity: 1;
      }
    }
  }

  #version {
    position: absolute;
    right: 5px;
    bottom: 0px;
    font-size: 16px;
    background: transparent !important;
    color: $googleBlue;
  }
  #footer {
    color: $googleGreen;

    position: absolute;
    bottom: 0px;
    font-size: 16px;
    background: transparent !important;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes fade {
    from {
      filter: opacity(0);
    }
    to {
      filter: opacity(1);
    }
  }
  .home {
    background: white;
  }

  @keyframes move_i {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes move_r {
    from {
      top: 5000px;
    }
    to {
      top: 0px;
    }
  }
  @keyframes move_e {
    from {
      bottom: 5000px;
    }
    to {
      bottom: 0px;
    }
  }
  @keyframes move_a {
    from {
      left: 5000px;
    }
    to {
      left: 0px;
    }
  }
  @keyframes move_d {
    from {
      right: 5000px;
    }
    to {
      right: 0px;
    }
  }

  @keyframes move2_i {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes move2_r {
    from {
      bottom: 0px;
    }
    to {
      bottom: 70px;
    }
  }
  @keyframes move2_e {
    from {
      right: 0px;
    }
    to {
      right: 50px;
    }
  }
  @keyframes move2_a {
    from {
      left: 0px;
    }
    to {
      left: 50px;
    }
  }
  @keyframes move2_d {
    from {
      top: 0px;
    }
    to {
      top: 70px;
    }
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  .home,
  body {
    height: 100% !important;
    width: 100% !important;
  }

  .home,
  body {
    position: absolute;
  }

  #i {
    position: relative;
    animation: move_i 3s ease-in-out;
    color: $googleBlue;
  }
  #r {
    position: relative;
    animation: move_r 4s ease-in-out;
    color: $googleRed;
  }
  #e {
    position: relative;
    animation: move_e 4s ease-in-out;
    color: $googleYellow;
  }
  #a {
    position: relative;
    animation: move_a 4s ease-in-out;
    color: $googleBlue;
  }
  #d {
    position: relative;
    animation: move_d 4s ease-in-out;
    color: $googleGreen;
  }

  .home {
    position: relative;
  }
  .main-container {
    margin: 0;
    position: absolute; /* 2 */
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 50%; /* 3 */
    transform: translate(0%, -50%); /* 4 */
  }

  #col-center {
    height: 100%;
  }

  .container-center {
    position: relative;
    top: 25%;
    left: 0%;
    transition: 1s;

    &:hover {
      cursor: pointer;

      #divider-flower {
        top: 50px;
      }

      #enter-btn {
        transition: 0.5s;
        filter: opacity(1);
      }
    }
  }

  .go-btn {
    box-shadow: 0px 2px 3px gray;
    position: absolute;
    left: 45%;
    top: 65%;
    opacity: 0;
    transition: 3s;
    width: 30px !important;
    height: 70px !important;
    background: url("../assets/img/google-wall.jpg");
    background-position: center;
    background-size: cover;
    color: $secondary !important;
    font-family: $style5 !important;
    font-size: 25px !important;
    font-weight: bold !important;
    &:hover {
      transform: scale(1.2);
      color: white !important;
    }
  }

  #title {
    position: reative;
    margin-top: 15%;
    font-size: 7em;
    animation: fade 2s ease-in-out;
    transition: 4s;
    &:hover {
      margin-left: 300px;
      #i {
        opacity: 0;
        transition: 3s;
        color: $googleBlue;
      }
      #r {
        transition: 3s;
        color: $googleBlue;
      }
      #e {
        transition: 3s;

        color: $googleGreen;
      }
      #a {
        transition: 3s;

        color: $googleRed;
      }
      #d {
        transition: 3s;

        color: $googleYellow;
      }

      .go-btn {
        opacity: 1;
      }
    }
  }

  #version {
    position: fixed;
    right: 10px;
    bottom: 15px;
    font-size: 16px;
    background: transparent !important;
    color: $googleBlue;
  }
  #footer {
    color: $googleGreen;
    left: 10px;
    position: fixed;
    bottom: 15px;
    font-size: 16px;
    background: transparent !important;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes fade {
    from {
      filter: opacity(0);
    }
    to {
      filter: opacity(1);
    }
  }
  .home {
    background: white;
  }

  @keyframes move_i {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes move_r {
    from {
      top: 5000px;
    }
    to {
      top: 0px;
    }
  }
  @keyframes move_e {
    from {
      bottom: 5000px;
    }
    to {
      bottom: 0px;
    }
  }
  @keyframes move_a {
    from {
      left: 5000px;
    }
    to {
      left: 0px;
    }
  }
  @keyframes move_d {
    from {
      right: 5000px;
    }
    to {
      right: 0px;
    }
  }

  @keyframes move2_i {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes move2_r {
    from {
      bottom: 0px;
    }
    to {
      bottom: 70px;
    }
  }
  @keyframes move2_e {
    from {
      right: 0px;
    }
    to {
      right: 50px;
    }
  }
  @keyframes move2_a {
    from {
      left: 0px;
    }
    to {
      left: 50px;
    }
  }
  @keyframes move2_d {
    from {
      top: 0px;
    }
    to {
      top: 70px;
    }
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  .home,
  body {
    height: 100% !important;
    width: 100% !important;
  }

  .home,
  body {
    position: absolute;
  }

  #i {
    position: relative;
    animation: move_i 3s ease-in-out;
    color: $googleBlue;
  }
  #r {
    position: relative;
    animation: move_r 4s ease-in-out;
    color: $googleRed;
  }
  #e {
    position: relative;
    animation: move_e 4s ease-in-out;
    color: $googleYellow;
  }
  #a {
    position: relative;
    animation: move_a 4s ease-in-out;
    color: $googleBlue;
  }
  #d {
    position: relative;
    animation: move_d 4s ease-in-out;
    color: $googleGreen;
  }

  .home {
    position: relative;
    height: 800px;
  }
  .main-container {
    margin: 0;
    position: absolute; /* 2 */
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 50%; /* 3 */
    transform: translate(0%, -50%); /* 4 */
  }

  #col-center {
    height: 900px;
  }

  .container-center {
    position: relative;
    top: 25%;
    left: 0%;
    transition: 1s;

    &:hover {
      cursor: pointer;

      #divider-flower {
        top: 50px;
      }

      #enter-btn {
        transition: 0.5s;
        filter: opacity(1);
      }
    }
  }

  .go-btn {
    box-shadow: 0px 2px 3px gray;
    position: absolute;
    left: 45%;
    top: 40%;
    opacity: 0;
    transition: 3s;
    width: 30px !important;
    height: 70px !important;
    background: url("../assets/img/google-wall.jpg");
    background-position: center;
    background-size: cover;
    color: $secondary !important;
    font-family: $style5 !important;
    font-size: 25px !important;
    font-weight: bold !important;
    &:hover {
      transform: scale(1.2);
      color: white !important;
    }
  }

  #title {
    font-size: 7em;
    animation: fade 2s ease-in-out;
    transition: 4s;
    &:hover {
      margin-left: 300px;
      #i {
        opacity: 0;
        transition: 3s;
        color: $googleBlue;
      }
      #r {
        transition: 3s;
        color: $googleBlue;
      }
      #e {
        transition: 3s;

        color: $googleGreen;
      }
      #a {
        transition: 3s;

        color: $googleRed;
      }
      #d {
        transition: 3s;

        color: $googleYellow;
      }

      .go-btn {
        opacity: 1;
      }
    }
  }

  #version {
    position: fixed;
    right: 10px;
    bottom: 15px;
    font-size: 16px;
    background: transparent !important;
    color: $googleBlue;
  }
  #footer {
    color: $googleGreen;
    left: 10px;
    position: fixed;
    bottom: 15px;
    font-size: 16px;
    background: transparent !important;
  }
  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes fade {
    from {
      filter: opacity(0);
    }
    to {
      filter: opacity(1);
    }
  }
  .home {
    background: white;
  }

  @keyframes move_i {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes move_r {
    from {
      top: 5000px;
    }
    to {
      top: 0px;
    }
  }
  @keyframes move_e {
    from {
      bottom: 5000px;
    }
    to {
      bottom: 0px;
    }
  }
  @keyframes move_a {
    from {
      left: 5000px;
    }
    to {
      left: 0px;
    }
  }
  @keyframes move_d {
    from {
      right: 5000px;
    }
    to {
      right: 0px;
    }
  }

  @keyframes move2_i {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes move2_r {
    from {
      bottom: 0px;
    }
    to {
      bottom: 70px;
    }
  }
  @keyframes move2_e {
    from {
      right: 0px;
    }
    to {
      right: 50px;
    }
  }
  @keyframes move2_a {
    from {
      left: 0px;
    }
    to {
      left: 50px;
    }
  }
  @keyframes move2_d {
    from {
      top: 0px;
    }
    to {
      top: 70px;
    }
  }
}
</style>
