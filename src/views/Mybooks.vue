<template>
  <v-container fluid>
    <SectionTitle :title="sectionTitle"/>


    <v-sheet height="100%" width="100%" class="pa-10 black--text" elevation="10">
      <h2
        class="text-center red white--text pa-5 rounded"
        v-if="storagedBooks.length === 0"
      >
        This list is empty. You can add books searching in the Main section.
      </h2>

      <v-row v-for="(item, i) in storagedBooks" :key="i" class="text-center mx-auto my-5">
        <v-col lg="2" md="2" ma-auto>
          <div class="background"></div>
          <v-img
            class="book-img"
            :src="
              item.volumeInfo.imageLinks === undefined
                ? coverNotExists
                : item.volumeInfo.imageLinks.thumbnail
            "
            width="80%"
          ></v-img>
        </v-col>
        <v-col lg="7" md="6" class="ma-auto">
          <p class="book-title">
            {{ item.volumeInfo.title }}
          </p>

          <v-card
            class="book-author white--text"
            :color="item.volumeInfo.authors === undefined ? 'red' : 'blue darken-4'"
            width="100%"
          >
            {{
              item.volumeInfo.authors === undefined
                ? "Author no available"
                : item.volumeInfo.authors[0]
            }}
          </v-card>

          <v-card
            class="book-date white--text"
            elevation="10"
            :color="item.volumeInfo.publishedDate === undefined ? 'red' : 'blue accent-4'"
            width="100%"
          >
            {{
              item.volumeInfo.publishedDate === undefined
                ? "Date no available"
                : item.volumeInfo.publishedDate.slice(0, 4)
            }}
          </v-card>

          <v-card color="grey darken-4" class="white--text pa-5" elevation="10"
            >Available on: (disabled for now)<br />
            <v-btn small color="error" class="badge-book">EBOOK</v-btn>
            <v-btn small color="orange" class="white--text badge-book">FREE-EBOOK</v-btn>
            <v-btn small color="blue" class="white--text badge-book">FULL</v-btn>
            <v-btn small color="green" class="white--text badge-book">PAID-EBOOK</v-btn>
            <v-btn small color="indigo" class="white--text badge-book">PARTIAL</v-btn>
          </v-card>
        </v-col>
        <v-col lg="3" md="4" class="ma-auto">
          <v-btn
            color="cyan darken-4"
            class="my-2 d-block mx-auto white--text"
            width="100%"
            :disabled="disabled"
            >Share (Soon)</v-btn
          >
          <v-btn
            color="blue darken-4"
            class="my-2 d-block mx-auto white--text"
            width="100%"
            :disabled="disabled"
            >Write a review (Soon)</v-btn
          >
          <v-btn
            color="indigo darken-4"
            class="my-2 d-block mx-auto white--text"
            width="100%"
            :disabled="disabled"
            >Read (Soon)</v-btn
          >
          <v-btn
            color="blue-grey darken-4"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%"
            @click="removeBook(item)"
            >Remove</v-btn
          >
        </v-col>
        <hr class="my-10" />
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import SectionTitle from "../components/SectionTitle"
export default {
  data() {
    return {
      coverNotExists: require("../assets/img/error-img.jpg"),
      storagedBooks: [],
      disabled: true,
      sectionTitle: "My books"
    };
  },
  components: {
    SectionTitle
  },
  computed: {},
  methods: {
    ...mapActions(["goApp"]),
    removeBook(item) {
      this.storagedBooks = JSON.parse(localStorage.getItem("mySelectedBooks"));

      const index = this.storagedBooks.indexOf(item);

      this.storagedBooks.splice(0, 1);
      localStorage.setItem("mySelectedBooks", JSON.stringify(this.storagedBooks));

      console.log(index);
      console.log(this.storagedBooks);
    },
    getMyBooks() {
      if (localStorage.getItem("mySelectedBooks")) {
        this.storagedBooks = JSON.parse(localStorage.getItem("mySelectedBooks"));
      }
      console.log(this.storagedBooks);
    },
  },
  created() {
    this.goApp();
    this.getMyBooks();
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "src/scss/variables";

// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  body {
    height: 100%;
    width: 100%;
  }

  .book-img {
    border-radius: 15px;
    text-align: center;
    margin: 0 auto;
    border: 2px solid rgba(255, 255, 255, 0.445);
    box-shadow: 0px 5px 7px black;
    margin-bottom: 0px;
  }

  .book-title {
    font-size: 2.5em;
    text-align: left;
    font-family: $style6;
    border-radius: 15px;
    background-image: linear-gradient(to right, #57123e, rgb(208, 89, 89));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-bottom: 2px solid #151515;
    box-shadow: 0px 5px 8px #57123ec9;
    padding: 10px;
  }

  .book-author {
    font-size: 1.5em;
    text-align: center;
    font-family: $style7;
    padding: 5px;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    border-radius: 15px 15px 0px 0px !important;
  }

  .book-date {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    font-family: $style4;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 0px 0px 15px 15px !important;
  }

  .badge-book {
    margin: 5px;
    padding: 0px;
    border-radius: 25px;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  body {
    height: 100%;
    width: 100%;
  }

  .book-img {
    border-radius: 15px;
    text-align: center;
    margin: 0 auto;
    border: 2px solid rgba(255, 255, 255, 0.445);
    box-shadow: 0px 5px 7px black;
    margin-bottom: 0px;
    width: 450px !important;
  }

  .book-title {
    font-size: 1.5em;
    text-align: left;
    font-family: $style6;
    border-radius: 15px;
    background-image: linear-gradient(to right, #57123e, rgb(208, 89, 89));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-bottom: 2px solid #151515;
    box-shadow: 0px 5px 8px #57123ec9;
    padding: 10px;
  }

  .book-author {
    font-size: 1em;
    text-align: center;
    font-family: $style7;
    padding: 5px;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    border-radius: 15px 15px 0px 0px !important;
  }

  .book-date {
    font-size: 1em;
    font-weight: bold;
    text-align: center;
    font-family: $style4;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 0px 0px 15px 15px !important;
  }

  .badge-book {
    margin: 5px;
    padding: 0px;
    border-radius: 25px;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  body {
    height: 100%;
    width: 100%;
  }

  .book-img {
    border-radius: 15px;
    text-align: center;
    margin: 0 auto;
    border: 2px solid rgba(255, 255, 255, 0.445);
    box-shadow: 0px 5px 7px black;
    margin-bottom: 0px;
  }

  .book-title {
    font-size: 2.5em;
    text-align: left;
    font-family: $style6;
    border-radius: 15px;
    background-image: linear-gradient(to right, #57123e, rgb(208, 89, 89));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    border-bottom: 2px solid #151515;
    box-shadow: 0px 5px 8px #57123ec9;
    padding: 10px;
  }

  .book-author {
    font-size: 1.5em;
    text-align: center;
    font-family: $style7;
    padding: 5px;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    border-radius: 15px 15px 0px 0px !important;
  }

  .book-date {
    font-size: 1.5em;
    font-weight: bold;
    text-align: center;
    font-family: $style4;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 0px 0px 15px 15px !important;
  }

  .badge-book {
    margin: 5px;
    padding: 0px;
    border-radius: 25px;
  }
}
</style>
