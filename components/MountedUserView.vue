<script>
export default {
  name: "MountedUserView",
  computed: {
    checkUserIsMounted() {
      if (!this.$store.getters["user/getUser"]) this.$router.push("/");
    },
  },
  mounted() {
    console.log(this.$store);
    if (typeof this.checkUserIsMounted === "function")
      this.checkUserIsMounted();
  },
};
</script>

<template>
  <div><slot /></div>
</template>
