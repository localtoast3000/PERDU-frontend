<script>

export default {
    name: "Index",
    layout: 'index',
};
</script>

<template>
  <main>
    <header>
      <SvgLogo className="logo" :scale="1.5" color="var(--logo-color)" />
      <h1>
        <span class="header-top">THINK YOUR LOST ITEMS ARE GONE FOR GOOD?</span
        ><span class="header-bottom">WE SAY NO WAY!</span>
      </h1>
    </header>
    <div></div>
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-items: center;
    padding: 20px;
    font-family: var(--regular-font);
    background-color: var(--main-background-color);
  }
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  h1 {

  }
</style>