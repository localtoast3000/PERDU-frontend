<template>
  <v-app class="text">
    <StyleVariubleProvider>
      <Nuxt />
    </StyleVariubleProvider>
  </v-app>
</template>

<style>
.text .error--text {
  color: var(--error) !important;
  caret-color: var(--error) !important;
  border-color: var(--error) !important;
  outline-color: var(--error) !important;
}
</style>
