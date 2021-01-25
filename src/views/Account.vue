<template>
  <v-sheet height="100%" width="100%" elevation="10" class="pa-5">

        <SectionTitle :title="sectionTitle"/>

    <v-row>

    <v-col>
      <v-list>
          <p class="green--text">Saved books</p>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  My Books: {{myBooks.length}}
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Wish list: {{wishList.length}}
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Read books: {{readBooks.length + readBooksGoogle.length}}
              </v-list-item-title>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite books: <v-btn class="orange darken-2" small disabled>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite authors: <v-btn class="orange darken-2" small disabled>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
          <v-list-item>
              <v-list-item-title class="list-summary">
                  Favourite genres: <v-btn class="orange darken-2"  small disabled>Show info</v-btn>
              </v-list-item-title>
          </v-list-item>
      </v-list>

        </v-col>

    <v-col>
        <v-list>
            <p class="primary--text">User data</p>
            <v-list-item>
                <v-list-item-title class="list-summary">
                    Username: 
                </v-list-item-title>
            </v-list-item>
            
            <v-list-item>
                <v-list-item-title class="list-summary">
                    Email:
                </v-list-item-title>
            </v-list-item>

        </v-list>


    </v-col>
    </v-row>

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
            readBooks: [],
            readBooksGoogle: [],
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
        this.readBooks = JSON.parse(localStorage.getItem("storageReadBooks"));

        }
           if(localStorage.getItem("storageReadBooksGoogle")) {
        this.readBooksGoogle = JSON.parse(localStorage.getItem("storageReadBooksGoogle"));

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