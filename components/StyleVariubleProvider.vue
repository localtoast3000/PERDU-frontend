<script>
export default {
  computed: {
    darkMode() {
      return this.$store.state.darkMode.value;
    },
  },
  methods: {
    toggleDarkMode() {
      this.$store.commit("darkMode/toggleDarkMode");
    },
  },
};
</script>

<template>
  <div :class="['style-variuble-container', darkMode ? 'dark' : 'light']">
    <Style>{{
      `
body {
  background: var(--body-background);
}
`
    }}</Style>
    <slot />
  </div>
</template>

<style scoped>
.style-variuble-container {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>
