<template>
  <v-sheet height="100%" width="100%" elevation="10" class="pa-5">

        <SectionTitle :title="sectionTitle"/>

    

      <v-list>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Saved books (My Books): {{myBooks.length}}
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Saved books (Wish list): {{wishList.length}}
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Read books: {{readbooks.length}}
              </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite books: <v-btn class="orange darken-2"  dark small>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite authors: <v-btn class="orange darken-2" dark  small>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite genres: <v-btn class="orange darken-2" dark  small>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
      </v-list>

  </v-sheet>
</template>

<script>
import {mapActions} from "vuex";
import SectionTitle from "../components/SectionTitle";

export default {
    name: "Account",
    data() {
        return {
            myBooks: [],
            wishList: [],
            readbooks: [],
            sectionTitle: "Account summary",
        }
    },
    components: {
        SectionTitle
    },
    methods: {
        ...mapActions(["goApp"]),
    getBookData() {
         if (localStorage.getItem("storageWishList")) {
        this.wishList = JSON.parse(localStorage.getItem("storageWishList"));
            }

         if (localStorage.getItem("storageMyBooks")) {
        this.myBooks = JSON.parse(localStorage.getItem("storageMyBooks"));
            }
        if(localStorage.getItem("storageReadBooks")) {
            this.readbooks.push(JSON.parse(localStorage.getItem("storageReadBooks")));
        }
   
     
    }
    },
     created() {
        this.goApp();
    },
    mounted() {
        this.getBookData();
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';


.list-summary {
    font-size: 14px !important;
}
</style>