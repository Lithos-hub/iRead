<template>
<v-container>
          <SectionTitle :title="sectionTitle"/>

          <div class="list-group">
         
         <ul v-for="(item, i) in changelog" :key="i">
         <p>{{item.version}}</p>
             <li v-for="(changes, i) in item.changes" :key="'A' + i">{{changes}}</li>
        </ul>
          </div>



</v-container>
</template>

<script>
import SectionTitle from "../components/SectionTitle";
import {mapActions} from "vuex";
export default {
    data() {
        return {
            sectionTitle: "Changelog",
            changelog: [
                {version: "Version 1.1.0", changes: ["Added the following sections: Best Sellers, My account (Account), Login / Register (Access).", "Aesthetic changes in general.", "Responsive improvements."]},
                {version: "Version 1.2.0", changes: ["Added the Best Sellers section powered with The New York Times API.", "Dynamic data in the Account Summary section."]},
                {version: "Version 1.3.0", changes: ["Added new features like Read and Buy buttons.", "Added reactive badges in My Books section about the availability.", "Added the Read section."]},
                {version: "Version 1.4.0", changes: ["Minus aesthetic changes.", "EPUB/PDF/READ buttons available."]},
                {version: "Version 1.4.1", changes: ["New logo and favicon."]},
            ]
        }
    },
    components: {
        SectionTitle
    },
    methods: {
        ...mapActions(["goApp"]),
        showReverse() {
            this.changelog.reverse();
        }
    },
    created() {
    this.goApp();
    this.showReverse();
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';

</style>