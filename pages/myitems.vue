<script>
export default {
  name: "MyItems",
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
    <main>
      <div class="main-wrapper">
        <header>
          <TopNavBar :user="user" />
        </header>
        <div class="items-container" v-if="user?.items?.length > 0">
          <Item v-for="(item, index) in user.items" :key="index" :item="item" />
        </div>
        <div class="items-container" v-else>
          <p>No lost items added</p>
        </div>
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
.items-container {
  width: 100%;
  max-width: 400px;
  min-height: 300px;
  height: auto;
}
header {
  width: 100%;
  margin-bottom: 50px;
}
</style>
