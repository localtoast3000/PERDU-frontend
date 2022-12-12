<script>
import { availableCategories } from "../lib/data";
import { format } from "date-fns";

export default {
  props: { item: Object },
  computed: {
    determineImage() {
      if (!availableCategories.includes(this.item.category))
        return () => import("../components/svg/DefaultItem.vue");
      return () => import(`../components/svg/${this.item.category}.vue`);
    },
  },
  methods: {
    formatDeclaredDate() {
      return format(new Date(this.item.declared), "dd/MM/yyyy");
    },
    relocateToUpdatePage() {
      this.$router.push(`updateitem/${this.item.id}`);
    },
  },
};
</script>
<template>
  <div class="item-body">
    <div class="top-wrapper">
      <div class="image-container">
        <component :is="determineImage"></component>
      </div>
      <div class="item-details-right">
        <div class="item-row">
          <p class="item-key">Category :</p>
          <p class="item-value">{{ item.category }}</p>
        </div>
        <div
          class="item-row"
          v-for="([key, value], index) in Object.entries(item.details)"
          :key="index"
        >
          <p class="item-key">
            {{ key.replace(key[0], key[0].toUpperCase()) }} :
          </p>
          <p class="item-value">{{ value }}</p>
        </div>
      </div>
      <v-btn icon @click="relocateToUpdatePage"><v-icon>mdi-pen</v-icon></v-btn>
    </div>
    <div class="item-details-bottom">
      <div class="item-row">
        <p class="item-key">ID :</p>
        <p class="item-value">{{ item.id }}</p>
      </div>
      <div class="item-row">
        <p class="item-key">Declared :</p>
        <p class="item-value">{{ formatDeclaredDate() }}</p>
      </div>
      <div class="item-row">
        <p class="item-key">Address :</p>
        <p class="item-value">{{ item.address }}</p>
      </div>
      <div class="item-row">
        <p class="item-key">Status :</p>
        <p class="item-value">{{ !item.isFound ? "lost" : "found" }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-body {
  display: flex;
  flex-direction: column;
  border: solid 1px black;
  color: black;
  width: 100%;
  padding: 10px;
}
.top-wrapper {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}
.item-details-right {
  width: 100%;
  margin-left: 10px;
  font-size: 0.9rem;
}
.item-row {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.item-key {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 130px;
  font-family: var(--semi-bold-font);
  margin-right: 10px;
}
.item-value {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
}
</style>
