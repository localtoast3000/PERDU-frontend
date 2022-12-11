<script>
export default {
  props: {
    item: "",
    details: "",
    status: "",
    reported: "",
  },
};
</script>
<template>
  <div class="item-body">
    <div class="item-image">{{ item === "Laptop" ? SvgLaptop : "" }}</div>
    <div class="right-info">
      <div class="row" :v-for="[key, value] in Object.entries(details)">
        <p class="key">{{ key }}</p>
        <p class="value">{{ value }}</p>
      </div>
    </div>
    <div class="bottom-info"></div>
  </div>
</template>
<style></style>
