<template>
  <dialog open>
    <header class="m-4">
      <h2>Dodaj nowy film</h2>
    </header>
    <div>
      <form @submit.prevent="submitData">
        <div class="mb-3">
          <label for="title" class="m-2"> Tytuł</label>
          <input
            id="title"
            class="form-control"
            name="title"
            type="text"
            v-model="enteredTitle"
          />
        </div>
        <div class="mb-3">
          <label for="director" class="form-label"> Reżyser</label>
          <input
            id="director"
            class="form-control"
            name="director"
            type="text"
            v-model="enteredDirector"
          />
        </div>
        <div class="mb-3">
          <label for="year" class="form-label"> Rok premiery</label>
          <input
            id="year"
            class="form-control"
            name="year"
            type="text"
            v-model="enteredYear"
          />
        </div>
        <div class="mb-3">
          <label for="rate" class="form-label"> Ocena</label>
          <input
            id="rate"
            class="form-control"
            name="rate"
            type="number"
            v-model="enteredRate"
          />
        </div>
        <div>
          <base-button>Dodaj film</base-button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script>
export default {
  emits: ['add-movie'],
  data() {
    return {
      enteredTitle: '',
      enteredDirector: '',
      enteredYear: '',
      enteredRate: '',
    };
  },
  methods: {
    submitData() {
      this.$emit(
        'add-movie',
        this.enteredTitle,
        this.enteredDirector,
        this.enteredYear,
        this.enteredRate
      );
    },
  },
};
</script>
