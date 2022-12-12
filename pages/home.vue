<script>
export default {
  name: "Home",
  data() {
    return {
      user: this.$store.getters["user/getUser"],
    };
  },
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
  },
};
</script>

<template>
  <MountedUserView>
    <TopNavBar :user="user" />
    <main>
      <div class="main-wrapper">
        <header></header>
        <h2 class="page-header">Last item added</h2>
        <div class="items-container">
          <Item
            v-if="user.items?.length > 0"
            :item="user.items[user.items.length - 1]"
          />
          <p v-else>No lost items added</p>
        </div>
        <v-btn
          class="report-item-btn"
          height="50"
          :nuxt="true"
          href="/reportitem"
          >Report an item</v-btn
        >
      </div>
    </main>
  </MountedUserView>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: var(--regular-font);
  width: 100%;
  padding: 10px;
}
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
header {
  width: 100%;
}
.items-container {
  width: 100%;
  max-width: 400px;
  min-height: 300px;
  height: auto;
}
.report-item-btn {
  background: var(--primary-color) !important;
  color: white !important;
  font-family: var(--regular-font) !important;
  font-size: 1rem;
}
.page-header {
  width: 100%;
  padding: 20px;
}
</style>
