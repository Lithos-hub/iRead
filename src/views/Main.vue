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
      <v-col lg="2" md="3"></v-col>
      <v-col lg="8" md="6">
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
      <v-col lg="2" md="3"></v-col>
    </v-row>

    <v-divider></v-divider>

    <v-container v-if="results">
      
      <v-sheet width="100%" height="100%" elevation="10" class="pa-5" rounded color="white">

            
            <v-row no-gutters class="text-center pa-2 secondary cyan--text rounded">
                <v-col>Cover image</v-col>
                <v-col>Title</v-col>
                <v-col>Author</v-col>
                <v-col>Published Year</v-col>
                <v-col>Language</v-col>
                <v-col>Actions</v-col>
            </v-row>
            
    
    
 

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
              color="blue-grey darken-3"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%"
              @click="addToWishList(item)"
              :disabled="wishSelected.includes(item) ? disabled : noDisabled"
              >Add to wish list
            </v-btn>
            <v-btn
              color="blue-grey darken-4"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%"
              @click="addToMyBooks(item)"
              :disabled="mybooksSelected.includes(item) ? disabled : noDisabled"
              >Add to my books
            </v-btn>
              <v-switch
            inset
            label="Just read!"
            @click="addToReadBooks(item)"
            :disabled="readBooks.includes(item) ? justread : !justread"
            ></v-switch>
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
      loader: false,
      wishSelected: [],
      mybooksSelected: [],
      readBooks: [],
      justread: true,
      addedToMyBooks: false,
      coverNotExists: require("../assets/img/error-img.jpg"),
    };
  },
  computed: {
    ...mapState(["enteredApp"]),
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
      this.mybooksSelected.push(item);
      const storage = JSON.parse(localStorage.getItem("storageMyBooks")) || [];
      storage.push(item);

      localStorage.setItem("storageMyBooks", JSON.stringify(storage));
    },
    addToWishList(item) {
      this.snackbar = true;
      this.wishSelected.push(item);
      const storage = JSON.parse(localStorage.getItem("storageWishList")) || [];
      storage.push(item);

      localStorage.setItem("storageWishList", JSON.stringify(storage));
    },
    addToReadBooks(item) {
      this.readBooks.push(item);
      const storage = JSON.parse(localStorage.getItem("storageReadBooksGoogle")) || [];
      storage.push(item);
      localStorage.setItem("storageReadBooksGoogle", JSON.stringify(storage));
      }
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
