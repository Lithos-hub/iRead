<template>
  <v-container>
    <!-- SNACK BAR WHEN YOU ADD A BOOK -->
    <v-snackbar
      id="added-snackbar"
      v-model="snackbar"
      timeout="1000"
      right
      centered
      top
      color="deep-purple accent-4"
      elevation="10"
    >
      Book added!
    </v-snackbar>

    <h1 class="main-title">
      <span id="s">S</span>
      <span id="e">e</span>
      <span id="a">a</span>
      <span id="r">r</span>
      <span id="c">c</span>
      <span id="h">h</span>
    </h1>
    <v-row>
      <v-col></v-col>
      <v-col>
        <form @submit.prevent="searchBook(searchInput)">
          <v-text-field
            outlined
            placeholder="Search books, authors, series..."
            append-icon="mdi-google"
            v-model="searchInput"
          ></v-text-field>

          <v-btn color="secondary" block text elevation="5" type="submit">Search</v-btn>
        </form>
        <p v-if="errorMessage" class="error--text mt-5">
          Oops. Something went wrong. Try different words.
        </p>
        <div v-if="loader">
          <p class="loader">
            Loading...
            <v-progress-circular
              indeterminate
              size="50"
              color="green"
              class="spinner"
            ></v-progress-circular>
          </p>
        </div>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-divider></v-divider>

    <v-container v-if="results">
      <h3 class="orange pa-2 rounded white--text text-center">Results</h3>
      <v-sheet height="100%" width="100%" class="pa-5 black--text" elevation="10">
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
          v-for="(item, i) in itemsData"
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
            <v-btn color="green" :disabled="disabled" block class="my-2"
              >Read (soon)</v-btn
            >
            <v-btn color="orange" :disabled="disabled" block class="my-2"
              >Buy (soon)</v-btn
            >
            <v-btn
              block
              small
              class="my-2"
              @click="addToWishList(item)"
              :disabled="wishSelected.includes(item) ? disabled : noDisabled"
              >Add to wish list
            </v-btn>
            <v-btn
              block
              small
              color="purple"
              class="my-2 white--text"
              @click="addToMyBooks(item)"
              :disabled="mySelectedBook.includes(item) ? disabled : noDisabled"
              >Add to my books
            </v-btn>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>
  </v-container>
</template>

<script>
import axios from "axios";

import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      disabled: true,
      noDisabled: false,
      snackbar: false,
      searchInput: "",
      errorMessage: false,
      results: false,
      itemsData: [],
      wishSelected: [],
      mySelectedBook: [],
      loader: false,
      addedToMyBooks: false,
      coverNotExists: require("../assets/img/error-img.jpg"),
    };
  },
  computed: {
    ...mapState(["enteredApp", "myBooks"]),
  },
  methods: {
    ...mapActions(["goApp"]),
    searchBook(searchInput) {
      const url = `https://www.googleapis.com/books/v1/volumes?q=${searchInput}&startIndex=21&maxResults=40`;
      this.results = false;
      url.split(" ").join("-").toLowerCase();

      return new Promise((resolve) => {
        searchInput.length > 0 ? (this.loader = true) : (this.loader = false);

        axios
          .get(url)
          .then((resp) => {
            console.log(resp.data.items);

            this.loader = false;
            this.errorMessage = false;
            this.results = true;
            this.itemsData = resp.data.items;
          })
          .catch((e) => {
            if (e.includes("thumbnail")) {
              this.coverExists = false;
              e = "Image no available";
              console.info(e);
            } else {
              this.coverNotExists = true;
              return;
            }
          });
      });
    },
    addToMyBooks(item) {
      console.log(item);
      this.snackbar = true;
      this.$store.state.myBooks.push(item);
      this.mySelectedBook.push(item);

      const storage = JSON.parse(localStorage.getItem("mySelectedBooks")) || [];
      storage.push(item);

      localStorage.setItem("mySelectedBooks", JSON.stringify(storage));
    },
    addToWishList(item) {
      this.snackbar = true;
      this.$store.state.wishList.push(item);
      this.wishSelected.push(item);

      const storage = JSON.parse(localStorage.getItem("myWishedBooks")) || [];
      storage.push(item);

      localStorage.setItem("myWishedBooks", JSON.stringify(storage));
    },
  },
  created() {
    this.goApp();
  },
};
</script>

<style lang="scss" scoped>
@import "src/scss/variables";

.main-title {
  font-family: $style5;
  font-size: 5em;
  font-weight: bold;
  text-align: center;
}

#s {
  color: $googleBlue;
}
#e {
  color: $googleRed;
}
#a {
  color: $googleYellow;
}
#r {
  color: $googleGreen;
}
#c {
  color: $googleBlue;
}
#h {
  color: $googleRed;
}

.results-row {
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom: 1px solid $googleBlue;
}

#show-more-btn {
  display: block;
}

.loader {
  font-size: 3em;
  color: $googleGreen;
  text-align: center;
  margin: 50px;
}

.spinner {
  display: block;
  margin: 0 auto;
}
</style>
