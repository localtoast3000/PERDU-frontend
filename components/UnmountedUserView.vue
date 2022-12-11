<script>
export default {
  name: "UnmountedUserView",
  computed: {
    checkUserIsMounted() {
      if (this.$store.getters["user/getUser"]) this.$router.push("/home");
    },
  },
  mounted() {
    if (typeof this.checkUserIsMounted === "function")
      this.checkUserIsMounted();
  },
};
</script>

<template>
  <div><slot /></div>
</template>
