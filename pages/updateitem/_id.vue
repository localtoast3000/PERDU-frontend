<script>
import { postData, deleteData } from "../../api/backend_requests";
import { availableCategories } from "../../lib/data";
import { format, parseISO } from "date-fns";

export default {
  name: "ReportItem",
  data() {
    return {
      item: {},
      availableCategories,
      user: this.$store.getters["user/getUser"],
      submitError: false,
      datepickerMenu: false,
      formValues: {
        address: "",
        declared: "",
        details: {
          brand: "",
          model: "",
          colour: "",
          condition: "",
          isFound: false,
        },
      },
      validation: {
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
      const res = await postData("/items/update", {
        token: this.user.token,
        address: this.formValues.address,
        details: this.formValues.details,
        declared: this.formValues.declared,
      });
      if (res.result) {
        console.log(res);
        this.$store.commit("user/mountUser", res.user);
        this.$router.push("/myitems");
      }
      this.submitError = res.error;
    },
    async submitDeleteItem() {
      const res = await deleteData(`/items/remove`, {
        token: this.user.token,
        id: this.item.id,
      });
      if (res.result) {
        console.log(res);
        this.$store.commit("user/mountUser", res.user);
        this.$router.push("/myitems");
      }
      this.submitError = res.error;
    },
    resetFields() {
      this.formValues.address = this.item.address;
      this.formValues.declared = format(
        new Date(this.item.declared),
        "yyyy-MM-dd"
      );
      this.formValues.details.brand = this.item.details.brand;
      this.formValues.details.model = this.item.details.model;
      this.formValues.details.colour = this.item.details.colour;
      this.formValues.details.condition = this.item.details.condition;
    },
    determineImage() {
      if (!availableCategories.includes(this.item.category))
        return () => import("../../components/svg/DefaultItem.vue");
      return () => import(`../../components/svg/${this.item.category}.vue`);
    },
  },
  created() {
    if (this.user) {
      this.item = this.user.items.find(
        ({ id }) => id === this.$route.params.id
      );
      this.resetFields();
    }
  },
};
</script>

<template>
  <MountedUserView>
    <header>
      <TopNavBar :user="user" />
    </header>
    <main>
      <div>
        <p>{{ item.category }}</p>
        <div class="image-container">
          <component :is="determineImage"></component>
        </div>
      </div>
      <p class="submit-error">{{ submitError ? submitError : "" }}</p>
      <v-form class="form-container" ref="form">
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
        <v-checkbox
          class="found-checkbox"
          v-model="formValues.isFound"
          label="Found"
          color="var(--primary-color)"
        ></v-checkbox>
        <v-btn
          type="submit"
          @click.stop.prevent="submitForm"
          class="submit-btn"
          height="50"
          >Update</v-btn
        >
        <v-btn
          type="submit"
          @click.stop.prevent="submitDeleteItem"
          class="delete-btn"
          height="50"
          >Delete</v-btn
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
.delete-btn {
  background: var(--error) !important;
  color: white !important;
  font-family: var(--regular-font) !important;
  font-size: 1rem;
  margin-top: 10px;
}
.found-checkbox >>> label {
  font-size: 0.8rem;
  margin-left: 10px;
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
