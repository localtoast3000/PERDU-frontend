<script>
export default {
  name: "Index",
  layout: "index",
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
  },
};
</script>

<template>
  <main>
    <header>
      <SvgLogo className="logo" :scale="1.5" color="var(--logo-color)" />
      <h1>
        <span class="header-top">THINK YOUR LOST ITEMS ARE GONE FOR GOOD?</span
        ><span class="header-bottom">WE SAY NO WAY!</span>
      </h1>
    </header>
    <SvgTwoPeople />
    <div class="bottom-container">
      <p>Declare any lost items with us and we can help you recover them</p>
      <v-btn class="signup-btn" height="40">Sign up</v-btn>
      <v-btn class="login-btn" outlined height="40">Login</v-btn>
    </div>
  </main>
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
h1 {
  display: flex;
  flex-direction: column;
  font-family: var(--header-font);
  font-weight: 600;
  font-size: 2.4rem;
  text-shadow: 0px 0px 3px var(--shadow-color);
}
.header-bottom {
  margin-top: 20px;
}
.bottom-container {
  display: flex;
  flex-direction: column;
}
p {
  font-family: var(--semi-bold-font);
}
.signup-btn {
  background: var(--primary-color) !important;
  color: white !important;
}
.login-btn {
  background: transparent !important;
  color: black !important;
  margin-top: 20px;
}
</style>

