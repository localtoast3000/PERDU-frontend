<script>
import { availableCategories } from "../lib/data";

export default {
  props: {
    category: {
      type: String,
      default: "",
    },
    detailsSetRight: {
      type: Array,
      default: [{ details: "No details" }],
    },
    detailsSetBottom: {
      type: Array,
      default: [{ details: "No details" }],
    },
  },
  computed: {
    determineImage() {
      if (!availableCategories.includes(this.category))
        return () => import("../components/svg/DefaultItem.vue");
      return () => import(`../components/svg/${this.category}.vue`);
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
          <p class="item-value">{{ category }}</p>
        </div>
        <div
          class="item-row"
          v-for="(item, index) in detailsSetRight"
          :key="index"
        >
          <p class="item-key">{{ Object.keys(item)[0] }}</p>
          <p class="item-value">{{ Object.values(item)[0] }}</p>
        </div>
      </div>
      <v-btn icon><v-icon>mdi-close</v-icon></v-btn>
    </div>
    <div class="item-details-bottom">
      <div
        class="item-row"
        v-for="(item, index) in detailsSetBottom"
        :key="index"
      >
        <p class="item-key">{{ Object.keys(item)[0] }} :</p>
        <p class="item-value">{{ Object.values(item)[0] }}</p>
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
