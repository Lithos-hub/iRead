<template>
  <div class="section-header">
      <h1 class="section-title">{{title}}</h1>

  </div>
</template>

<script>
export default {
    name: "SectionTitle",
    props: ["title"]
}
</script>

<style lang="scss">
@import 'src/scss/variables';

.section-title {
  position: relative;
  top: 0px;
  width: 100%;
  font-family: $style4;
  text-align: center;
  color: $googleBlue;
  padding-left: 25px;
  font-size: 2em;
  letter-spacing: 15px;
  border-bottom: 2px solid $googleBlue;
}


</style>