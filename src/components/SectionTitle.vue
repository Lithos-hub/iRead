<template>
  <div class="section-header">
      <h1 class="section-title secondary">{{title}}</h1>

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
  font-family: $style4;
  text-align: center;
  color: cyan;
  padding: 5px;
  padding-left: 15px;
  border-radius: 15px;
  font-size: 2em;
  letter-spacing: 15px;
}


</style>