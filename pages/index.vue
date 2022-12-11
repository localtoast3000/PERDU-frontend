<script>
export default {
  name: "Index",
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
  },
};
</script>

<template>
  <UnmountedUserView>
    <main>
      <div class="main-wrapper">
        <header>
          <SvgLogo className="logo" :scale="1" color="var(--logo-color)" />
          <h1>
            <span class="header-top"
              >THINK YOUR LOST ITEMS ARE GONE FOR GOOD?</span
            ><span class="header-bottom">WE SAY NO WAY!</span>
          </h1>
        </header>
        <SvgTwoPeople className="two-people" />
        <div class="bottom-container">
          <p>Declare any lost items with us and we can help you recover them</p>
          <div class="btns-container">
            <v-btn class="signup-btn" height="50" :nuxt="true" href="/signup"
              >Sign up</v-btn
            >
            <v-btn
              class="login-btn"
              v-ripple="{ class: 'login-btn-ripple' }"
              outlined
              height="50"
              :nuxt="true"
              href="/login"
              >Login</v-btn
            >
          </div>
        </div>
      </div>
    </main>
  </UnmountedUserView>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  font-family: var(--regular-font);
  width: 100%;
}
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}
header {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}
h1 {
  display: flex;
  flex-direction: column;
  font-family: var(--header-font);
  font-weight: 600;
  font-size: 1.5rem;
  text-shadow: 0px 0px 3px var(--shadow-color);
  margin-top: 30px;
}
.header-bottom {
  margin-top: 5px;
}
.two-people {
  padding: 10px;
}
.bottom-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}
p {
  font-family: var(--semi-bold-font);
  padding: 10px;
  text-align: center;
}
.btns-container {
  display: flex;
  flex-direction: column;
  padding: 0 20px;
}
.signup-btn {
  background: var(--primary-color) !important;
  color: white !important;
  font-family: var(--regular-font) !important;
  font-size: 1rem;
}
.login-btn {
  background: transparent !important;
  color: black !important;
  margin-top: 20px;
  outline: solid 1px black !important;
  font-size: 1rem;
  font-family: var(--regular-font) !important;
  border: none;
}
.login-btn:hover {
  background: #f9f9f9 !important;
  opacity: 1;
}

.login-btn::before {
  background: #ffffff !important;
  opacity: 0;
}
</style>
<style>
.v-ripple__container.login-btn-ripple {
  opacity: 0.3;
  color: rgb(51, 51, 51);
}
</style>
