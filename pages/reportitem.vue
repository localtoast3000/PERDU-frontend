<script>
import { postData } from "../api/backend_requests";
import { availableCategories } from "../lib/data";
import { format, parseISO } from "date-fns";

export default {
  name: "ReportItem",
  data() {
    return {
      availableCategories,
      user: this.$store.getters["user/getUser"],
      submitError: false,
      datepickerMenu: false,
      formValues: {
        category: "",
        address: "",
        declared: "",
        details: {
          brand: "",
          model: "",
          colour: "",
          condition: "",
        },
        authentication: {
          secretQuestion: "",
          secretAnswer: "",
        },
      },
      validation: {
        category: [
          (v) => !!v || "Category is required",
          (v) => typeof v === "string" || "Invalid Category",
        ],
        address: [(v) => typeof v === "string" || "Invalid address"],
        declared: [
          (v) => !!v || "Date lost is required",
          (v) => typeof v === "string" || "Invalid Date",
        ],
        brand: [
          (v) => !!v || "A brand name is required",
          (v) => typeof v === "string" || "Invalid brand name",
        ],
        colour: [
          (v) => !!v || "A colour is required",
          (v) => typeof v === "string" || "Invalid colour",
        ],
        condition: [
          (v) => !!v || "A condition description is required",
          (v) => typeof v === "string" || "Invalid condition",
        ],
        secretQuestion: [
          (v) => {
            return this.formValues.authentication.secretAnswer
              ? !!v || "A secret question is required"
              : true;
          },
          (v) => typeof v === "string" || "Invalid question",
        ],
        secretAnswer: [
          (v) => {
            return this.formValues.authentication.secretQuestion
              ? !!v || "A secret answer is required"
              : true;
          },
          (v) => typeof v === "string" || "Invalid answer",
        ],
      },
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
    formatedDate() {
      return this.formValues.declared
        ? format(parseISO(this.formValues.declared), "EEEE, MMMM do yyyy")
        : "";
    },
  },
  methods: {
    async submitForm() {
      if (!this.$refs.form.validate()) return;
      const res = await postData("/items/add", {
        token: this.user.token,
        category: this.formValues.category,
        address: this.formValues.address,
        details: this.formValues.details,
        authentication: this.formValues.authentication,
        declared: this.formValues.declared,
      });
      if (res.result) {
        this.$store.commit("user/mountUser", res.user);
        this.$router.push("/myitems");
      }
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
          class="select-field select-container"
          content-class="select-options"
          v-model="formValues.category"
          :items="availableCategories"
          :rules="validation.category"
          label="Category"
          color="var(--primary-color)"
          item-color="#6c63ff"
        ></v-select>
        <v-text-field
          class="text-field"
          v-model="formValues.address"
          label="Location address"
          color="var(--primary-color)"
          :rules="validation.address"
        ></v-text-field>
        <v-menu
          content-class="date-picker-menu"
          v-model="datepickerMenu"
          :close-on-content-click="false"
          max-width="290"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              class="text-field"
              :value="formatedDate"
              v-model="formValues.declared"
              clearable
              label="Date lost"
              readonly
              v-bind="attrs"
              v-on="on"
              :rules="validation.declared"
              prepend-icon="mdi-calendar"
              @click:clear="date = null"
              color="var(--primary-color)"
            ></v-text-field>
          </template>
          <v-date-picker
            class="date-picker"
            v-model="formValues.declared"
            @change="datepickerMenu = false"
            :max="new Date().toISOString()"
            color="#6c63ff"
          ></v-date-picker>
        </v-menu>
        <div class="details">
          <p>Details</p>
          <v-text-field
            class="text-field"
            v-model="formValues.details.brand"
            label="Brand"
            color="var(--primary-color)"
            :rules="validation.brand"
          ></v-text-field>
          <v-text-field
            class="text-field"
            v-model="formValues.details.model"
            label="Model"
            color="var(--primary-color)"
            :rules="validation.model"
          ></v-text-field>
          <v-text-field
            class="text-field"
            v-model="formValues.details.colour"
            label="Colour"
            color="var(--primary-color)"
            :rules="validation.colour"
          ></v-text-field>
          <v-select
            class="select-field select-container"
            v-model="formValues.details.condition"
            :items="['New', 'Good', 'Bad', 'Old']"
            label="Condition"
            color="var(--primary-color)"
            item-color="#6c63ff"
            :rules="validation.condition"
          ></v-select>
        </div>
        <div class="authentication">
          <p>Authentication</p>
          <v-select
            class="select-field"
            v-model="formValues.authentication.secretQuestion"
            label="Secret question"
            color="var(--primary-color)"
            :rules="validation.secretQuestion"
            :items="[
              'What is the name of your first pet?',
              `What is your mother's maiden name?`,
              'What was the make of your first car?',
              'What was your favorite food as a child?',
            ]"
            item-color="#6c63ff"
          ></v-select>
          <v-text-field
            class="text-field"
            v-model="formValues.authentication.secretAnswer"
            label="Secret answer"
            color="var(--primary-color)"
            :rules="validation.secretAnswer"
          ></v-text-field>
        </div>
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

.text-field,
.select-field {
  margin: 10px 0;
}
.text-field >>> input,
.select-field >>> .v-select__selection {
  margin: 5px 0;
  padding: 10px 10px;
}
.text-field >>> label,
.select-field >>> label {
  padding: 0 10px;
  font-size: 0.9rem;
}
.select-field >>> input {
  margin-bottom: 10px;
}

.found-checkbox >>> label {
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
<style>
.v-menu__content {
  transform: translate(-50%, 48px);
  left: 50% !important;
}
.date-picker-menu {
  transform: translate(-50%, 58px);
  left: 50% !important;
}
</style>
