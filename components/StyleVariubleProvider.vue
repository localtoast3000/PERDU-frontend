<style>
  @import '../style_variubles/theme.css';
  @import '../style_variubles/typography.css';
</style>

<script>
    export default {

    }
</script>

<template>
    <div :class="['style-variuble-container', 'dark', 'typography'] ">
      <slot />
    </div>
</template>

<style scoped>
  .style-variuble-container {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    width: 100%;
  }
</style>