<template>
  <dialog open>
    <div>
      <h2>Czy na pewno chcesz usunąć film?</h2>
      <section>
        <base-button @click="deleteMovie">Tak</base-button>
        <base-button @click="closeDeleteDialog">Nie</base-button>
      </section>
    </div>
  </dialog>
</template>

<script>
export default {
  props: ['id', 'toggleDeleteDialog'],
  emits: ['delete-confirmation'],
  methods: {
    deleteMovie() {
      this.$emit('delete-confirmation', this.id);
    },
    closeDeleteDialog() {
        this.toggleDeleteDialog();
    }
  },
};
</script>
