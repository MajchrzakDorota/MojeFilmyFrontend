<template>
  <delete-dialog
    v-if="deleteButtonPressed"
    :id="this.id"
    :toggleDeleteDialog="toggleDeleteDialog"
    @delete-confirmation="deleteMovie"
  ></delete-dialog>
  <edit-movie
    :id="this.id"
    :title="this.title"
    :director="this.director"
    :year="this.year"
    :rate="this.rate"
    v-if="editButtonPressed"
    :toggleEditForm="toggleEditForm"
    @edit-movie="editMovieData"
  ></edit-movie>
  <tr>
    <td>{{ title }}</td>
    <td>{{ director }}</td>
    <td>{{ year }}</td>
    <td>{{ rate }}</td>
    <td>
      <base-button @click="toggleEditForm">Edytuj</base-button>
      <base-button class="btn btn-outline-danger" @click="toggleDeleteDialog"
        >Usuń</base-button
      >
    </td>
  </tr>
</template>

<script>
import DeleteDialog from './DeleteDialog.vue';
import EditMovie from './EditMovie.vue';
import axios from 'axios';

export default {
  data() {
    return {
      deleteButtonPressed: false,
      editButtonPressed: false,
    };
  },
  components: {
    DeleteDialog,
    EditMovie,
  },
  props: ['id', 'title', 'director', 'year', 'rate', 'getAllData', 'editMovie'],

  methods: {
    toggleEditForm() {
      this.editButtonPressed = !this.editButtonPressed;
    },
    toggleDeleteDialog() {
      this.deleteButtonPressed = !this.deleteButtonPressed;
    },
    deleteMovie(id) {
      axios.delete('https://localhost:7281/movies/' + id).then((response) => {
        if (response) {
          this.deleteButtonPressed = !this.deleteButtonPressed;
          this.getAllData();
        }
      });
    },
    editMovieData(id, dataToSend) {
      this.editMovie(id, dataToSend);
      this.toggleEditForm();
    },
  },
};
</script>
