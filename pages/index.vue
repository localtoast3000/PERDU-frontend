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
    <div></div>
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
</style>
