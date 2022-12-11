<script>
import { emailValidator } from "../lib/validators";
import { postData } from "../api/backend_requests";

export default {
  name: "Login",
  data() {
    return {
      submitError: false,
      formValues: {
        email: "",
        password: "",
      },
      validationSchema: {
        email: [emailValidator],
        password: [(v) => (v ? true : "Password is required")],
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
    async submitForm() {
      if (!this.$refs.form.validate()) return;
      const res = await postData("/users/login", {
        email: this.formValues.email,
        password: this.formValues.password,
      });
      if (res.result) {
        this.mountUser(res.user);
        this.$router.push("/home");
      }
      this.submitError = res.error;
    },
    mountUser(newUser) {
      this.$store.commit("user/mountUser", newUser);
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
          class="text-field text-field--email"
          v-model="formValues.email"
          label="E-mail"
          :rules="validationSchema.email"
          color="var(--primary-color)"
          required
        ></v-text-field>
        <v-text-field
          class="text-field text-field--password"
          v-model="formValues.password"
          :type="hidePassword ? 'password' : 'text'"
          label="Password"
          color="var(--primary-color)"
          :rules="validationSchema.password"
          :append-icon="hidePassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="hidePassword = !hidePassword"
        ></v-text-field>
        <v-btn
          type="submit"
          @click.stop.prevent="submitForm"
          class="submit-btn"
          height="50"
          >Login</v-btn
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
