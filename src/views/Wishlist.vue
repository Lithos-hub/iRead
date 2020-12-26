<template>
  <v-container>
    <SectionTitle :title="sectionTitle"/>


    <h2
      class="text-center red white--text pa-5 rounded"
      v-if="storagedBooks.length === 0"
    >
      This list is empty. You can add books searching in the Main section.
    </h2>

    <v-sheet height="100%" width="100%" class="pa-5 black--text" elevation="10" v-if="storagedBooks.length > 0">
      <v-card color="primary white--text">
        <v-row class="font-weight-bold text-center">
          <v-col>Cover</v-col>
          <v-col>Title</v-col>
          <v-col>Author/s</v-col>
          <v-col>Published Year</v-col>
          <v-col>Language</v-col>
          <v-col>Actions</v-col>
        </v-row>
      </v-card>

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
          <v-btn color="green" :disabled="disabled" block class="my-2">Read (soon)</v-btn>
          <v-btn color="orange" :disabled="disabled" block class="my-2">Buy (soon)</v-btn>
          <v-btn color="red" dark block outlined class="my-2" @click="removeBook(item)"
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
      const myBooks_array = this.storagedBooks;

      const index = myBooks_array.indexOf(item);

      if (index > -1) {
        myBooks_array.splice(index, 1);
      }
    },
    getWishList() {
      if (localStorage.getItem("myWishedBooks")) {
        this.storagedBooks = JSON.parse(localStorage.getItem("myWishedBooks"));
      }
      console.log(this.storagedBooks);
    },
  },
  computed: {
    ...mapState(["wishList"]),
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
