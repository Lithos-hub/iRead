<template>
  <v-container fluid>
      <SectionTitle :title="sectionTitle"/>

<v-sheet height="100%" width="100%" class="pa-10 black--text" elevation="10">
      <h2
        class="text-center red white--text pa-5 rounded"
        v-if="storagedBooks.length === 0"
      >
        This list is empty. You can add books in Best Sellers/Main sections.
      </h2>

      <v-row v-for="(item, i) in storagedBooks" :key="'A' + i" class="text-center mx-auto my-5">
        <div class="container mx-auto text-center">
         <v-chip
          class="ma-2 text-center"
          color="secondary"
        >
          The New York Times API
        </v-chip>
        </div>
        <v-col lg="2" md="2" sm="6" class="ma-auto">
          
          <v-img
            class="book-img d-flex"
            :src="
              item.book_image
            "
            width="100%"
          ></v-img>
        </v-col>
        <v-col lg="7" md="6" sm="6" class="ma-auto">
          <p class="book-title">
            {{ item.title }}
          </p>

          <div
            class="black--text"
            width="100%"
          >
          {{item.author}}
          </div>
        </v-col>
        <v-col lg="3" md="4" sm="12" class="ma-auto">
          <v-btn
            color="cyan darken-4"
            class="my-2 d-block mx-auto white--text"
            width="100%"
            :disabled="disabled"
            >Share (Soon)</v-btn
          >

          <a :href="item.buy_links[0].url" style="text-decoration: none;">
            <v-btn id="amazon-btn" class="my-2 d-block mx-auto" width="100%">Buy (Amazon)</v-btn>
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
        <hr class="my-10" />
      </v-row>

      <v-row v-for="(item, i) in storagedBooksGoogle" :key="'B' + i" class="text-center mx-auto my-5">
        <div class="container mx-auto text-center">
         <v-chip
          class="ma-2 text-center white--text"
          color="blue darken-2"
        >
          Google Books API
        </v-chip>
        </div>
        <v-col lg="2" md="2" sm="6" class="ma-auto">
          
          <v-img
            class="book-img"
            :src="
              item.volumeInfo.imageLinks === undefined
                ? coverNotExists
                : item.volumeInfo.imageLinks.thumbnail
            "
            width="100%"
          ></v-img>
        </v-col>
        <v-col lg="7" md="6" sm="6" class="ma-auto">
          <p class="book-title">
            {{ item.volumeInfo.title }}
          </p>

          <div
            class="black--text"
            :color="item.volumeInfo.authors === undefined ? 'red' : 'white'"
            width="100%"
          >
            {{
              item.volumeInfo.authors === undefined
                ? "Author no available"
                : item.volumeInfo.authors[0]
            }}
          </div>
        </v-col>
        <v-col lg="3" md="4" sm="12" class="ma-auto">
          <v-btn
            color="cyan darken-4"
            class="my-2 d-block mx-auto white--text"
            width="100%"
            :disabled="disabled"
            >Share (Soon)</v-btn
          >
          <a :href="item.accessInfo.webReaderLink">
            <v-btn color="blue-grey darken-2"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%">Read</v-btn>
            </a>
            <a :href="item.volumeInfo.infoLink">
            <v-btn
            elevation="10"
            class="my-2 d-block mx-auto white--text font-weight-bold"
            width="100%" id="buyGoogleBtn">Buy (Google)</v-btn>
            </a>
          <v-btn
            color="blue-grey darken-4"
            elevation="10"
            class="my-2 d-block mx-auto cyan--text"
            width="100%"
            @click="removeBookGoogle(item)"
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
      storagedBooksGoogle: [],
      disabled: true,
      sectionTitle: "Already read"
    };
  },
  components: {
    SectionTitle
  },
  computed: {},
  methods: {
    ...mapActions(["goApp"]),
    removeBook(item) {
      this.storagedBooks = JSON.parse(localStorage.getItem("storageReadBooks"));

      const index = this.storagedBooks.indexOf(item);

      this.storagedBooks.splice(0, 1);
      localStorage.setItem("storageReadBooks", JSON.stringify(this.storagedBooks));
    },
     removeBookGoogle(item) {
      this.storagedBooksGoogle = JSON.parse(localStorage.getItem("storageReadBooksGoogle"));

      const index = this.storagedBooksGoogle.indexOf(item);

      this.storagedBooksGoogle.splice(0, 1);
      localStorage.setItem("storageReadBooksGoogle", JSON.stringify(this.storagedBooksGoogle));
     },
    getMyBooks() {
      if (localStorage.getItem("storageReadBooks")) {
        this.storagedBooks = JSON.parse(localStorage.getItem("storageReadBooks"));
      }
    },
    getMyBooksGoogle() {
      if (localStorage.getItem("storageReadBooksGoogle")) {
        this.storagedBooksGoogle = JSON.parse(localStorage.getItem("storageReadBooksGoogle"));
      }
    },
  },
  created() {
    this.goApp();
    this.getMyBooks();
    this.getMyBooksGoogle();
  },
  mounted() {},
};
</script>

<style lang="scss">
@import "src/scss/variables";

// COMMON



// ******* MOBILE RESPONSIVE ******* //
@media only screen and (min-width: 360px) {
  body {
    height: 100%;
    width: 100%;
  }

  .book-img {
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
    box-shadow: 0px 5px 10px black;
    margin-bottom: 0px;
  }

  .book-title {
    
    font-size: 1.5em;
    text-align: center;
    font-family: $style6;
    border-radius: 0px;
    color: #303030;
    border-bottom: 5px solid $googleRed;
    padding: 10px;
  }

  .book-author {
    font-size: 1em;
    text-align: center;
    font-family: $style7;
    padding: 5px;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
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
    border-radius: 5px;
  }

  #amazon-btn {
    background: linear-gradient(to top, #F1C456 20%, rgb(255, 239, 199) 80%);
    border: 1px solid #9C7E31;
    color: #303030 !important;
}
  .badge {
    width: 100%;
    float: none !important;
  }
}
// ******* LAPTOP RESPONSIVE ******* //
@media only screen and (min-width: 767px) {
  body {
    height: 100%;
    width: 100%;
  }

  .book-img {
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
    
    box-shadow: 0px 5px 10px rgb(60, 60, 60);
    margin-bottom: 0px;
    width: 100% !important;
  }

  .book-title {
    font-size: 1.5em;
    text-align: center;
    font-family: $style6;
    border-radius: 5px;
    color: #303030;
    border-bottom: 5px solid $googleRed;
    padding: 10px;
  }

  .book-author {
    font-size: 1em;
    text-align: center;
    font-family: $style7;
    padding: 5px;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    border-radius: 5px 5px 0px 0px !important;
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
    border-radius: 0px 0px 5px 5px !important;
  }

  .badge-book {
    margin: 5px;
    padding: 0px;
    border-radius: 5px;
  }

  #amazon-btn {
    background: linear-gradient(to top, #F1C456 20%, rgb(255, 239, 199) 80%);
    border: 1px solid #9C7E31;
    color: #303030 !important;
}

  #buyGoogleBtn {
    background: url("../assets/img/google-wall.jpg");
    background-size: cover;
  }
}

// ******* DESKTOP RESPONSIVE ******* //
@media only screen and (min-width: 1370px) {
  body {
    height: 100%;
    width: 100%;
  }

  .book-img {
    border-radius: 5px;
    text-align: center;
    margin: 0 auto;
    
    box-shadow: 0px 5px 10px black;
    margin-bottom: 0px;
  }

  .book-title {
    font-size: 2.5em;
    text-align: center;
    font-family: $style6;
    border-radius: 5px;
    color: #303030;
    border-bottom: 5px solid $googleRed;
    padding: 10px;
  }

  .book-author {
    font-size: 1.5em;
    text-align: center;
    font-family: $style7;
    padding: 5px;
    text-shadow: 2px 3px 3px rgba(55, 8, 8, 0.426);
    letter-spacing: 5px;
    border-radius: 5px 5px 0px 0px !important;
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
    border-radius: 0px 0px 5px 5px !important;
  }

  .badge-book {
    margin: 5px;
    padding: 0px;
    border-radius: 25px;
  }

  #amazon-btn {
    background: linear-gradient(to top, #F1C456 20%, rgb(255, 239, 199) 80%);
    border: 1px solid #9C7E31;
    color: #303030 !important;
}
}
</style>
