<template>
  <v-container class="text-center">
      <SectionTitle :title="sectionTitle"/>

            <v-card class="error white--text pa-3" v-if="messageError">Oops! Something went wrong. Please, refresh the page.</v-card>


    <v-row v-for="(item, i) in bestsellers" :key="i">
        
        <h4 class="list-number">
            <div class="list-number-div">{{item.rank}}</div></h4>

            <v-col lg="2" md="3">
            <v-img :src="item.book_image" class="list-img"></v-img>
            </v-col>
            <v-col lg="10" md="9" class="text-left">
            <h1 class="list-title">{{item.title}}</h1>
            <h1 class="list-author">{{item.author}}</h1>
            <p class="list-desc">{{item.description}}</p>
            <a :href="item.buy_links[0].url" style="text-decoration: none;">
            <v-btn id="amazon-btn">Buy (Amazon)</v-btn>
            </a>
            
            <v-switch
            inset
            label="Just read!"
            @click="addToReadBooks(item)"
            :disabled="readBooks.includes(item) ? justread : !justread"
            ></v-switch>
            </v-col>
    
    </v-row>
  </v-container>
</template>

<script>
import {mapActions} from "vuex";
import SectionTitle from "../components/SectionTitle";
import axios from "axios";


export default {
    data() {
        return {
            sectionTitle: "Best Sellers",
            bestsellers: [],
            justread: true,
            readBooks: [],
            messageError: false,
        }
    },
    components: {
        SectionTitle
    },
    methods: {
        ...mapActions(["goApp"]),
        getBestSellers() {
            const apikey = "jSgAXxZYzyLYAxC1GtxJgX9VHoEzPsyD"
            const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${apikey}`;

        axios
            .get(url)
            .then((resp) => {
            console.log(resp.data.results.books);

        
            this.errorMessage = false;
            this.bestsellers = resp.data.results.books;
            })
            .catch((e) => {
            this.messageError = true;
            })
        },
        addToReadBooks(item) {
        this.readBooks.push(item);
        const storage = JSON.parse(localStorage.getItem("storageReadBooks")) || [];
        storage.push(item);
        localStorage.setItem("storageReadBooks", JSON.stringify(storage));
        }
    },
    created() {
    this.goApp();
    this.getBestSellers();
    }
    
}
</script>

<style lang="scss" scoped>
@import 'src/scss/variables';

.list-img {
    max-width: 300px;
}


.list-title {
    font-size: 3em;
    text-align: left;
    font-family: $style7;
}

.list-author {
    font-size: 1em;
    color: gray;
    font-weight: 100;
    font-family: $style6;
    text-align: left;
    letter-spacing: 2px;
}

.list-genre {
    font-size: 16px;
    background: rgb(21, 146, 129);
    border-radius: 25px;
    font-family: $style4;
    text-align: center;
    color: white;
    padding: 5px;
    letter-spacing: 5px;
}

.list-number {
    font-size: 4em;
    border-bottom: 5px solid $googleRed;
    text-align: left;
    font-family: $style4;
}

.list-desc {
    font-size: 18px;
    text-align: justify;
    margin-top: 15px;
}

#amazon-btn {
    background: linear-gradient(to top, #F1C456 20%, rgb(255, 239, 199) 80%);
    border: 1px solid #9C7E31;
    color: #303030 !important;
}
</style>