<template>
  <dialog open class="fixed-top mt-5">
    <header class="m-4">
      <h2>Edytuj Film</h2>
    </header>
    <div>
      <form>
        <div class="mb-3">
          <label for="title" class="m-2"> Tytuł</label>
          <input
            id="title"
            class="form-control"
            name="title"
            type="text"
            v-model="this.dataChanged.title"
          />
          <div v-if="v$.dataChanged.title.$error">
            Tytuł jest wymagany i może mieć maksymalnie 200 znaków.
          </div>
        </div>
        <div class="mb-3">
          <label for="director" class="form-label"> Reżyser</label>
          <input
            id="director"
            class="form-control"
            name="director"
            type="text"
            v-model="this.dataChanged.director"
          />
        </div>
        <div class="mb-3">
          <label for="year" class="form-label"> Rok premiery</label>
          <input
            id="year"
            class="form-control"
            name="year"
            type="text"
            v-model="this.dataChanged.year"
          />
          <div v-if="v$.dataChanged.year.$error">Rok pomiędzy 1900 a 2200.</div>
        </div>
        <div class="mb-3">
          <label for="rate" class="form-label"> Ocena</label>
          <input
            id="rate"
            class="form-control"
            name="rate"
            type="number"
            v-model="this.dataChanged.rate"
          />
        </div>
        <div>
          <base-button @click.prevent="submitData">Edytuj</base-button>
          <base-button @click="closeEditForm">Zamknij</base-button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, maxLength } from '@vuelidate/validators';

export default {
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      dataChanged: {
        title: this.title,
        director: this.director,
        year: this.year,
        rate: this.rate,
      },
    };
  },
  validations() {
    return {
      dataChanged: {
        title: { required, maxLength: maxLength(200), $autoDirty: true },
        year: {
          minValue: minValue(1900),
          maxValue: maxValue(2200),
          $autoDirty: true,
        },
      },
    };
  },
  props: ['id', 'title', 'director', 'year', 'rate', 'toggleEditForm'],
  emits: ['edit-movie'],
  methods: {
    closeEditForm() {
      this.toggleEditForm();
    },
    submitData() {
      const isFormCorrect = this.v$.$validate();
      isFormCorrect.then((isValid) => {
        if (isValid) {
          this.$emit('edit-movie', this.id, this.dataChanged);
        }
      });
    },
  },
};
</script>
