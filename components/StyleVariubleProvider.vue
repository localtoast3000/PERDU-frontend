<script>
export default {
  props: {
    darkBackgroundColor: String,
    lightBackgroundColor: String,
  },
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
  <div class="style-variuble-container">
    <Style>{{
      `
${darkMode ? '@import "theme/dark.css"' : '@import "theme/light.css"'};
@import "typography.css";

body {
  background: var(--body-background);
}

.style-variuble-container {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}
`
    }}</Style>
    <slot />
  </div>
</template>
