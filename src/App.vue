<template>
  <the-header></the-header>
  <button class="btn btn-outline-secondary" @click="addMovie">
    Dodaj Film
  </button>
  <button class="btn btn-outline-secondary m-3" @click="getDataFromMyMovies">
    Pobierz Filmy
  </button>
  <add-movie
    v-if="addMovieClick"
    @add-movie="addMovieToDatabase"
    :addMovie="addMovie"
  ></add-movie>
  <table class="table table-striped table-hover mt-3">
    <thead>
      <tr>
        <th>Tytuł</th>
        <th>Reżyser</th>
        <th>Rok premiery</th>
        <th>Ocena</th>
        <th>Akcje</th>
      </tr>
    </thead>
    <tbody>
      <movie-element
        v-for="dbMovie in dbMovies"
        :key="dbMovie.id"
        :id="dbMovie.id"
        :title="dbMovie.title"
        :director="dbMovie.director"
        :year="dbMovie.year"
        :rate="dbMovie.rate"
        :getAllData="getAllData"
        :editMovie="editMovie"
      ></movie-element>
    </tbody>
  </table>
  <div></div>
</template>

<script>
import TheHeader from './components/layouts/TheHeader.vue';
import axios from 'axios';
import AddMovie from './components/AddMovie.vue';

export default {
  components: {
    TheHeader,
    AddMovie,
  },
  data() {
    return {
      dbMovies: [],
      addMovieClick: false,
    };
  },
  methods: {
    getDataFromMyMovies() {
      var self = this;
      axios
        .get('https://localhost:7281/externalMovies', {
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(function (response) {
          self.dbMovies = [...self.dbMovies, ...response.data];
        });
    },
    getAllData() {
      var self = this;
      axios
        .get('https://localhost:7281/movies', {
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': '*',
          },
        })
        .then(function (response) {
          self.dbMovies = response.data;
        });
    },
    editMovie(id, data) {
      console.warn(id);
      console.log(data);
      axios
        .put(`https://localhost:7281/movies/${id}`, data)
        .then((response) => {
          if (response) {
            this.getAllData();
          }
        });
    },
    addMovie() {
      this.addMovieClick = !this.addMovieClick;
    },
    addMovieToDatabase(title, director, year, rate) {
      const data = {
        title: title,
        director: director,
        year: year,
        rate: rate,
      };
      axios.post('https://localhost:7281/movies', data).then((response) => {
        if (response) {
          this.getAllData();
          this.addMovieClick = !this.addMovieClick;
        }
      });
    },
  },
  mounted() {
    this.getAllData();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
