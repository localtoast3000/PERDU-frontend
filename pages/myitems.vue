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
    <header>
      <TopNavBar :user="user" />
    </header>
    <main>
      <div class="main-wrapper">
        <h2 class="page-header">My items</h2>
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
  padding: 10px;
}
.main-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}
.items-container {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 300px;
  height: auto;
  align-items: center;
  justify-content: center;
}
header {
  width: 100%;
}
.page-header {
  width: 100%;
  padding: 20px;
}
</style>
