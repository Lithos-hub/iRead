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
            v-on:click="genre = 'romance'"
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
            <v-btn color="green" dark block class="my-2">Read</v-btn>
            <v-btn color="orange" dark block class="my-2">Buy</v-btn>
            <!-- <v-btn
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
                </v-btn> -->
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
      fictiontab: null,
      coverNotExists: require("../assets/img/error-img.jpg"),
      books: [],
      genre: "fiction",
      sectionTitle: "Newest books by genre"
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
          console.log(resp.data.items);

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
  },
  created() {
    this.goApp();
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
</style>
