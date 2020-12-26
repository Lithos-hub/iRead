<template>
  <div class="about">
    <h2 class="text-center">
      About
      <span id="i">i</span>
      <span id="r">R</span>
      <span id="e">e</span>
      <span id="a">a</span>
      <span id="d">d</span>
    </h2>
    <hr />
    <v-sheet color="primary" height="100%" width="100%" class="pa-5" elevation="10">
      <v-row no-gutters>
        <v-col>
          <v-img src="../assets/img/english-icon.jpg" class="flag"></v-img>
        </v-col>
        <v-col>
          <v-img src="../assets/img/spanish-icon.jpg" class="flag"></v-img>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="sheet-text">
          iRead is an app with Material Design aesthetic that can be used to get data and
          interactivity using the Google Books API. The available options in version 1.0
          are:
          <ul style="list-style: none">
            <li>A books and authors search system (Main section).</li>
            <li>
              Two storage systems (My Books and Wish List). Books can be added from the
              search system.
            </li>
            <li>Newest releases classification by genre (By Genres section).</li>
          </ul>
          My point is to expand the posibilities considerably: access to shop/read links
          for each book; to list books by genre, new releases, best sellers, etc; to be
          able to write reviews and registering them on Google Books (surely, I would have
          to add a Google auth system for this. It would be an option only available for
          logged users.), among many others.
        </v-col>
        <v-col class="sheet-text">
          iRead es una aplicación con diseño basado en Material Design para ofrecer datos
          e interactividad mediante la API de Google Books. Las opciones disponibles en la
          version 1.0 son:
          <ul style="list-style: none">
            <li>Un sistema de búsqueda de libros y autores (Sección Main).</li>
            <li>
              Dos sistemas de guardado de libros (My Books y Wish List). Los libros pueden
              añadirse desde el sistema de búsqueda.
            </li>
            <li>Clasificación de nuevos lanzamientos por género (Sección By Genres).</li>
          </ul>
          Mi idea es ampliar de forma considerable las posibilidades: acceso a los enlaces
          de compra y lectura de cada libro; clasificación de libros por géneros, nuevos
          lanzamientos, lo más vendido, etc; o poder escribir reseñas y registrarlas en
          Google Books (para esto seguramente tendría que implementar un loggin/sign up de
          Google, por lo que sería una opción solo disponibles para aquellos usuarios
          logeados), entre muchas otras.
        </v-col>
      </v-row>
    </v-sheet>
  </div>
</template>
<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions(["goApp"]),
  },
  created() {
    this.goApp();
  },
};
</script>
<style lang="scss" scoped>
@import "src/scss/variables";

#i {
  color: $googleBlue;
  font-size: 1.5em;
  font-weight: 100;
}
#r {
  color: $googleRed;
  font-size: 1.5em;
}
#e {
  color: $googleYellow;
  font-size: 1.5em;
}
#a {
  color: $googleBlue;
  font-size: 1.5em;
}
#d {
  color: $googleGreen;
  font-size: 1.5em;
}

.sheet-text {
  font-size: 1.3em;
  color: white;
  text-align: justify;
  margin: 50px;
}

.flag {
  margin: 0 auto;
  margin-bottom: 0px;
  border-radius: 50%;
  width: 80px;
  height: 80px;
}
</style>
