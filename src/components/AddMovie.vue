<template>
  <dialog open class="fixed-top mt-5">
    <header class="m-4">
      <h2>Dodaj nowy film</h2>
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
            v-model="enteredTitle"
          />
          <div v-if="v$.enteredTitle.$error">
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
          <div v-if="v$.enteredYear.$error">Rok pomiędzy 1900 a 2200.</div>
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
          <base-button @click.prevent="submitData">Dodaj film</base-button>
          <base-button @click="closeAddMovieDialog">Zamknij</base-button>
        </div>
      </form>
    </div>
  </dialog>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { required, minValue, maxValue, maxLength } from '@vuelidate/validators';

export default {
  props: ['addMovie'],
  emits: ['add-movie'],
  setup() {
    return { v$: useVuelidate() };
  },
  data() {
    return {
      enteredTitle: '',
      enteredDirector: '',
      enteredYear: '',
      enteredRate: '',
    };
  },
  validations() {
    return {
      enteredTitle: { required, maxLength: maxLength(200), $autoDirty: true },
      enteredYear: {
        minValue: minValue(1900),
        maxValue: maxValue(2200),
        $autoDirty: true,
      },
    };
  },

  methods: {
    closeAddMovieDialog() {
      this.addMovie();
    },
    submitData() {
      const isFormCorrect = this.v$.$validate();
      isFormCorrect.then((isValid) => {
        if (isValid) {
          this.$emit(
            'add-movie',
            this.enteredTitle,
            this.enteredDirector,
            this.enteredYear,
            this.enteredRate
          );
        }
      });
    },
  },
};
</script>
