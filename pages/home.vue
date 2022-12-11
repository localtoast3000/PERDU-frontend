<script>
export default {
  name: "Home",
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
          <SvgLogo className="logo" :scale="1" color="var(--logo-color)" />
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
</style>
