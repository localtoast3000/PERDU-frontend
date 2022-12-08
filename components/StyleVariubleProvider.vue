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
  <div
    :class="[
      'style-variuble-container',
      'typography',
      darkMode ? 'dark' : 'light',
    ]"
  >
    <Style>{{
      `body { background:  ${
        darkMode ? darkBackgroundColor : lightBackgroundColor
      } }`
    }}</Style>
    <slot />
  </div>
</template>

<style>
@import "../style_variubles/theme.css";
@import "../style_variubles/typography.css";

.style-variuble-container {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
  width: 100%;
}
</style>
