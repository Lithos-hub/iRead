<template>
  <v-container>
    <SectionTitle :title="sectionTitle"/>


    <h2
      class="text-center red white--text pa-5 rounded"
      v-if="storagedBooks.length === 0"
    >
      This list is empty. You can add books searching in the Main section.
    </h2>

    <v-sheet width="100%" height="100%" elevation="10" class="pa-5" rounded color="white">
    <v-row no-gutters class="text-center pa-2 secondary cyan--text">
        <v-col>Cover image</v-col>
        <v-col>Title</v-col>
        <v-col>Author</v-col>
        <v-col>Published year</v-col>
        <v-col>Language</v-col>
        <v-col>Actions</v-col>
    </v-row>

      <v-row
        v-for="(item, i) in storagedBooks"
        :key="i"
        class="text-center results-row mx-auto"
      >
        <v-col class="ma-auto">
          <v-img
            :src="
              item.volumeInfo.imageLinks === undefined
                ? coverNotExists
                : item.volumeInfo.imageLinks.thumbnail
            "
            width="150"
          ></v-img>
        </v-col>
        <v-col class="ma-auto">
          <p>
            {{ item.volumeInfo.title }}
          </p>

          <p></p
        ></v-col>

        <v-col class="ma-auto">
          <p>
            {{
              item.volumeInfo.authors === undefined
                ? "Author no available"
                : item.volumeInfo.authors[0]
            }}
          </p>
        </v-col>
        <v-col class="ma-auto">
          <p>
            {{
              item.volumeInfo.publishedDate === undefined
                ? "Date no available"
                : item.volumeInfo.publishedDate.slice(0, 4)
            }}
          </p>
        </v-col>
        <v-col class="ma-auto">
          <v-img
            src="../assets/img/flags/spanish.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'es'"
          ></v-img>
          <v-img
            src="../assets/img/flags/english.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'en'"
          ></v-img>
          <v-img
            src="../assets/img/flags/francais.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'fr'"
          ></v-img>
          <v-img
            src="../assets/img/flags/francais.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'it'"
          ></v-img>
          <v-img
            src="../assets/img/flags/catalonia.png"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'ca'"
          ></v-img>
          <v-img
            src="../assets/img/flags/german.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'de'"
          ></v-img>
          <v-img
            src="../assets/img/flags/portugal.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'pt'"
          ></v-img>
          <v-img
            src="../assets/img/flags/swedish.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'sv'"
          ></v-img>
          <v-img
            src="../assets/img/flags/russian.svg"
            class="ma-auto"
            width="50"
            v-if="item.volumeInfo.language === 'ru'"
          ></v-img>
        </v-col>
        <v-col class="ma-auto">
            <a :href="item.accessInfo.webReaderLink">
            <v-btn color="blue-grey darken-1"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%">Read</v-btn>
            </a>
            <a :href="item.volumeInfo.infoLink">
            <v-btn color="blue-grey darken-2"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%">Buy</v-btn>
            </a>
           <v-btn
            color="blue-grey darken-4"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%"
            @click="removeBook(item)"
            >Remove</v-btn
          >
        </v-col>
      </v-row>
    </v-sheet>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import SectionTitle from "../components/SectionTitle";

export default {
  data() {
    return {
      coverNotExists: require("../assets/img/error-img.jpg"),
      storagedBooks: [],
      disabled: true,
      sectionTitle: "Wish List"
    };
  },
  components: {
    SectionTitle
  },
  methods: {
    ...mapActions(["goApp"]),
    removeBook(item) {
      this.storagedBooks = JSON.parse(localStorage.getItem("storageWishList"));

      const index = this.storagedBooks.indexOf(item);

      this.storagedBooks.splice(0, 1);
      localStorage.setItem("storageWishList", JSON.stringify(this.storagedBooks));

      console.log(index);
      console.log(this.storagedBooks);
    },
    getWishList() {
      if (localStorage.getItem("storageWishList")) {
        this.storagedBooks = JSON.parse(localStorage.getItem("storageWishList"));
      }
      console.log(this.storagedBooks);
    },
  },
  created() {
    this.goApp();
  },
  mounted() {
    this.getWishList();
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

body {
  height: 100%;
  width: 100%;
}
</style>
