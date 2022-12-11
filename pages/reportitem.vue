<script>
import { postData } from "../api/backend_requests";
import { availableCategories } from "../lib/data";

export default {
  name: "ReportItem",
  data() {
    return {
      availableCategories,
      user: this.$store.getters["user/getUser"],
      submitError: false,
      formValues: {
        category: "",
        found: false,
      },
      validation: {
        category: [
          (v) => !!v || "Category is required",
          (v) => typeof v === "string" || "Invalid Firstname",
        ],
      },
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
  },
  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) return;
      const res = await postData("/items/add", {
        category: this.formValues.category,
      });
      if (res.result) this.$router.push("/myitems");
      this.submitError = res.error;
    },
  },
};
</script>

<template>
  <MountedUserView>
    <header>
      <TopNavBar :user="user" />
    </header>
    <main>
      <p class="submit-error">{{ submitError ? submitError : "" }}</p>
      <v-form class="form-container" ref="form">
        <v-select
          class="select-container"
          :items="availableCategories"
          label="Standard"
        ></v-select>
        <v-checkbox
          class="found-checkbox"
          v-model="formValues.found"
          label="Found ?"
          color="var(--primary-color)"
        ></v-checkbox>
        <v-btn
          type="submit"
          @click.stop.prevent="submitForm"
          class="submit-btn"
          height="50"
          >Report item</v-btn
        >
      </v-form>
    </main>
  </MountedUserView>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  padding: 20px;
  font-family: var(--regular-font);
}

header {
  width: 100%;
}
.submit-error {
  color: var(--error);
  font-size: 0.8rem;
  text-align: center;
  margin-top: 20px;
}
.form-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  padding: 10px;
}

.text-field {
  margin: 10px 0;
}
.text-field >>> input {
  margin: 5px 0;
  padding: 10px 10px;
}
.text-field >>> label {
  padding: 0 10px;
  font-size: 0.9rem;
}
.email-input {
  margin: 0;
  margin-bottom: 10px;
}
.phone-input-container {
  margin: 10px 0;
}
.phone-input-container >>> p {
  margin: 5px 0;
}
.phone-input >>> * {
  border: none !important;
  outline: none !important;
  box-shadow: none !important;
}

.phone-input {
  border-bottom: solid 0.5px #6f6f6fde;
}
.phone-input >>> label {
  font-size: 0.6rem !important;
}
.phone-input >>> .country-selector__list {
  transform: translateY(1px);
  box-shadow: 0px 0px 5px #b8b8b8 !important;
}
.phone-helper-text {
  color: var(--error);
  font-size: 0.75rem;
}
.password-input {
  margin: 0;
}
.allowdata-share-checkbox >>> label {
  font-size: 0.8rem;
  margin-left: 10px;
}

.submit-btn {
  background: var(--primary-color) !important;
  color: white !important;
  font-family: var(--regular-font) !important;
  font-size: 1rem;
  margin-top: 10px;
}
</style>
