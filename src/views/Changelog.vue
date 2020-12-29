<template>
<v-container>
          <SectionTitle :title="sectionTitle"/>

          <div class="list-group">
         
         <p>Version 1.1</p>
         <ul>
             <li>Added the following sections: New releases, Top 100, Account summary (Account), Login / Register (Access).</li>
             <li>Aesthetic changes in general.</li>
             <li>Responsive improvements.</li>
        </ul>
         <p>Version 1.2</p>
         <ul>
             <li>Added the Best Sellers section powered with The New York Times API.</li>
             <li>Dynamic data in Account Summary section</li>
       
        </ul>
         <p>Version 1.3</p>
         <ul>
             <li>Added new features like Read and Buy buttons.</li>
             <li>Added reactive badges in My Books section about the availability.</li>
             <li>Added the Read section.</li>
       
        </ul>

        <p>Version 1.4</p>
        <ul>
        <li>Minus aesthetic changes.</li>
        <li>EPUB/PDF/READ buttons available.</li>
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
            sectionTitle: "Changelog"
        }
    },
    components: {
        SectionTitle
    },
    methods: {
        ...mapActions(["goApp"])
    },
    created() {
    this.goApp();
    }
}
</script>

<style lang="scss">
@import 'src/scss/variables';

</style>