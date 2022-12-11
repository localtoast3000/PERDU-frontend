<script>
import TwoPeople from "../components/svg/TwoPeople.vue";
export default {
  components: { TwoPeople },
  name: "MyItems",
  computed: {
    darkMode() {
      return this.$store.getters["darkMode/darkModeValue"];
    },
  },
};
</script>

<template>
  <MountedUserView>
    <main>
      <div class="main-wrapper">
        <header>
          <TopNavBar />
        </header>
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
</style>
