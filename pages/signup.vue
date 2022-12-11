<script>
import { emailValidator, passwordValidator } from "../lib/validators";
import { postData } from "../api/backend_requests";
import VuePhoneNumberInput from "vue-phone-number-input";
import "vue-phone-number-input/dist/vue-phone-number-input.css";

export default {
  components: { "vue-phone-number-input": VuePhoneNumberInput },
  name: "SignUp",
  data() {
    return {
      submitError: false,
      phoneInput: "",
      phoneError: false,
      formValues: {
        firstName: "",
        lastName: "",
        email: "",
        phone: false,
        password: "",
        allowDataShare: false,
      },
      validation: {
        firstName: [
          (v) => !!v || "Firstname is required",
          (v) => typeof v === "string" || "Invalid Firstname",
        ],
        lastName: [
          (v) => !!v || "Lastname is required",
          (v) => typeof v === "string" || "Invalid Lastname",
        ],
        phone: [
          (v) => (v.phoneNumber ? false : "A phone number is required"),
          (v) => (v.isValid ? false : "Invalid phone number"),
        ],
        email: [emailValidator],
        password: [passwordValidator],
      },
      hidePassword: true,
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
  },
  methods: {
    validatePhone(phoneObj) {
      for (let func of this.validation.phone) {
        const result = func(phoneObj);
        if (result) {
          this.phoneError = result;
          return;
        }
      }
      this.phoneError = false;
      this.formValues.phone = phoneObj.e164;
    },
    async submitForm() {
      if (!this.formValues.phone) this.phoneError = "Invalid phone number";
      if (!this.$refs.form.validate() || !this.formValues.phone) return;
      const res = await postData("/users/signup", {
        firstName: this.formValues.firstName,
        lastName: this.formValues.lastName,
        phone: this.formValues.phone,
        email: this.formValues.email,
        password: this.formValues.password,
        allowDataShare: this.formValues.allowDataShare,
      });
      if (res.result) this.$router.push("/login");
      this.submitError = res.error;
    },
  },
};
</script>

<template>
  <UnmountedUserView>
    <main>
      <header>
        <SvgLogo className="logo" :scale="1" color="var(--logo-color)" />
      </header>
      <p class="submit-error">{{ submitError ? submitError : "" }}</p>
      <v-form class="form-container" ref="form">
        <v-text-field
          class="text-field firstaname-input"
          v-model="formValues.firstName"
          label="First name"
          :rules="validation.firstName"
          color="var(--primary-color)"
          :ripple="false"
          required
        ></v-text-field>
        <v-text-field
          class="text-field lastname-input"
          v-model="formValues.lastName"
          label="Last name"
          :rules="validation.lastName"
          required
          color="var(--primary-color)"
        ></v-text-field>
        <div class="phone-input-container">
          <vue-phone-number-input
            class="phone-input"
            v-model="phoneInput"
            :required="true"
            :clearable="true"
            :countries-height="40"
            :style="`border-bottom: solid 0.5px ${
              phoneError ? 'var(--error)' : '#6f6f6fde'
            };`"
            size="lg"
            default-country-code="FR"
            :error="!phoneError ? false : true"
            color="#6c63ff"
            valid-color="#6c63ff"
            error-color="#fa6666"
            @update="validatePhone"
          />
          <p class="phone-helper-text">{{ phoneError ? phoneError : "" }}</p>
        </div>
        <v-text-field
          class="text-field email-input"
          v-model="formValues.email"
          label="E-mail"
          :rules="validation.email"
          required
          color="var(--primary-color)"
        ></v-text-field>
        <v-text-field
          v-model="formValues.password"
          class="text-field password-input"
          :type="hidePassword ? 'password' : 'text'"
          label="Password"
          :rules="validation.password"
          :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="hidePassword = !hidePassword"
          color="var(--primary-color)"
        ></v-text-field>
        <v-checkbox
          class="allowdata-share-checkbox"
          v-model="formValues.allowDataShare"
          label="I agree to receive information and commercial offers from PERDU partners (email, sms)"
          color="var(--primary-color)"
        ></v-checkbox>
        <v-btn
          type="submit"
          @click.stop.prevent="submitForm"
          class="submit-btn"
          height="50"
          >Create account</v-btn
        >
      </v-form>
    </main>
  </UnmountedUserView>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
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
