<template>
  <div>
        <SectionTitle :title="sectionTitle"/>

    <v-toolbar color="blue-grey darken-4" dark>
      <template v-slot:extension>
        <v-tabs centered>
          <v-tab
            active-class="cyan lighten-2 black--text"
            v-on:click="genre = 'fiction'"
            @click="getBooks()"
          >
            fiction
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'poetry'"
            @click="getBooks()"
          >
            poetry
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'love'"
            @click="getBooks()"
          >
            romance
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'fantasy'"
            @click="getBooks()"
          >
            fantasy
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'science'"
            @click="getBooks()"
          >
            science
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'technology'"
            @click="getBooks()"
          >
            technology
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'art'"
            @click="getBooks()"
          >
            art
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'crime'"
            @click="getBooks()"
          >
            Crime
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'adult'"
            @click="getBooks()"
          >
            Adult
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'business'"
            @click="getBooks()"
          >
            Business
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'cooking'"
            @click="getBooks()"
          >
            Cooking
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'manga'"
            @click="getBooks()"
          >
            Manga
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'horror'"
            @click="getBooks()"
          >
            Horror
          </v-tab>
          <v-tab
            active-class="cyan black--text"
            v-on:click="genre = 'history'"
            @click="getBooks()"
          >
            history
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>


    <v-row class="text-center secondary cyan--text table-header">

        <v-col cols="4">Image</v-col>
        <v-col cols="2">Title</v-col>
        <v-col>Author</v-col>
        <v-col>Year</v-col>
        <v-col>Actions</v-col>

    </v-row>

    <v-card tile color="blue-grey lighten-5" v-if="books.length > 0">
      <v-card-text>
        <v-row
          v-for="(item, i) in books"
          :key="i"
          class="text-center ma-auto"
        >
          <v-col cols="4" class="ma-auto">
            <img
              :src="
                item.volumeInfo.imageLinks === undefined
                  ? coverNotExists
                  : item.volumeInfo.imageLinks.thumbnail
              "
              class="cover-img"
            />
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
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
import SectionTitle from "../components/SectionTitle";

export default {
  data() {
    return {
      disabled: true,
      noDisabled: false,
      fictiontab: null,
      coverNotExists: require("../assets/img/error-img.jpg"),
      books: [],
      genre: "fiction",
      sectionTitle: "Newest books by genre",
      wishSelected: [],
      mybooksSelected: [],
    };
  },
  components: {
    SectionTitle
  },
  methods: {
    ...mapActions(["goApp"]),
    getBooks() {
      let genre = this.genre;

      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=21&maxResults=40&orderBy=newest`;
      this.results = false;
      axios
        .get(url)
        .then((resp) => {
          this.loader = false;
          this.errorMessage = false;
          this.results = true;
          this.books = resp.data.items;
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
    },
    showFictionBooks() {
      let genre = "fiction";

      const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&startIndex=21&maxResults=40&orderBy=newest`;
      this.results = false;
      axios
        .get(url)
        .then((resp) => {
          this.loader = false;
          this.errorMessage = false;
          this.results = true;
          this.books = resp.data.items;
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
  },
  mounted() {
    this.goApp();
    this.showFictionBooks();
  },
};
</script>

<style lang="scss">
@import "src/scss/variables";

.list {
  font-size: 2em;
  color: $googleBlue;
  text-align: left;
}

.cover-img {
  width: 200px;
}

.table-header {
  width: 100%;
  margin: 0 auto;
}

a {
  text-decoration: none;
}
</style>
