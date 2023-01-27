<template>
  <delete-dialog
    v-if="deleteButtonPressed"
    :id="this.id"
    :toggleDeleteDialog="toggleDeleteDialog"
    @delete-confirmation="deleteMovie"
  ></delete-dialog>
  <tr>
    <td>{{ title }} {{ director }} {{ year }} {{ rate }}</td>
    <td>
      <base-button>Edytuj</base-button>
      <base-button class="btn btn-outline-danger" @click="toggleDeleteDialog"
        >Usuń</base-button
      >
    </td>
  </tr>
</template>

<script>
import DeleteDialog from './DeleteDialog.vue';
import axios from 'axios';

export default {
  data() {
    return {
      deleteButtonPressed: false,
    };
  },
  components: {
    DeleteDialog,
  },
  props: ['id', 'title', 'director', 'year', 'rate', 'getAllData'],

  methods: {
    toggleDeleteDialog() {
      this.deleteButtonPressed = !this.deleteButtonPressed;
    },
    deleteMovie(id) {
      axios.delete('https://localhost:7281/movies/' + id).then((response) => {
        if (response) {
          this.deleteButtonPressed = !this.deleteButtonPressed;
          this.getAllData()
        }
      });
    },
  },
  mounted() {
    console.log(this.id);
  },
};
</script>

<style scoped>
button {
  color: black;
}
</style>
