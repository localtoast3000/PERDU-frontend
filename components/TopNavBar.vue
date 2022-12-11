<script>
export default {
  data() {
    return {
      menuOpen: false,
      user: this.$store.getters["user/getUser"],
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
  },
};
</script>
<template>
  <div>
    <v-toolbar height="70" color="var(--primary-color)">
      <v-app-bar-nav-icon
        color="white"
        class="top-bar"
        @click="toggleMenu"
      ></v-app-bar-nav-icon>
      <div class="id-wrapper">
        <p>{{ `${user.firstName}, ${user.lastName}` }}</p>
        <SvgIdImage className="id-image" :scale="0.7" />
      </div>
    </v-toolbar>
    <div :class="['menu', menuOpen ? 'menu-open' : 'menu-closed']">
      <ul class="menu-options-container">
        <li><NuxtLink to="/home">Home</NuxtLink></li>
        <li><NuxtLink to="/myitems">My items</NuxtLink></li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
main {
  width: 100%;
}
.menu {
  position: absolute;
  background: var(--bold-color);
  box-shadow: 2px 2px 5px rgb(151, 151, 151);
  background: var(--primary-color);
  transition: all 0.2s ease-in;
}

.menu-options-container {
  list-style-type: none;
  padding: 0;
  margin: 0;
  padding: 10px;
  width: 100vw;
}
.menu-options-container >>> li {
  padding: 10px;
}
.menu-options-container >>> a {
  text-decoration: none;
  color: white;
}
.id-wrapper {
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: flex-end;
  right: 0;
}
.id-wrapper p {
  color: white;
  margin-top: 20px;
}

.menu-open {
  position: absolute;
}
.menu-closed {
  position: absolute;
  top: -200px;
}
</style>
