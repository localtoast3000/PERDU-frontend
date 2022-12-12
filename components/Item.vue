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
    <v-btn class="edit-btn" icon @click="relocateToUpdatePage"
      ><v-icon size="18">mdi-pen</v-icon></v-btn
    >
    <div class="top-wrapper">
      <div class="image-container">
        <component
          :is="determineImage"
          v-bind="{ className: 'svg-image', scale: 0.8 }"
        ></component>
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
  box-shadow: 0px 4px 8px rgb(195, 195, 195);
  width: 100%;
  padding: 20px;
  border-radius: 4px;
  font-size: 0.7rem;
  max-width: 400px;
  margin-bottom: 10px;
}
.edit-btn {
  margin-left: auto;
  height: 20px;
  width: 20px;
  margin-bottom: 10px;
}
.top-wrapper {
  display: flex;
  margin-bottom: 20px;
}
.item-details-right {
  margin-left: auto;
  font-size: 0.7rem;
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
  min-width: 50px;
  font-family: var(--semi-bold-font);
  margin-right: 10px;
}
.item-value {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}
.image-container {
  display: flex;
  align-items: center;
}
.svg-image {
}
@media (min-width: 800px) {
  .item-body {
    margin: 10px;
  }
}
</style>
