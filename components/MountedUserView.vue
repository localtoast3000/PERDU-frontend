<script>
export default {
  name: "MountedUserView",
  computed: {
    checkUserIsMounted() {
      if (!this.$store.getters["user/getUser"]) this.$router.push("/");
    },
  },
  mounted() {
    this.checkUserIsMounted();
  },
};
</script>

<template>
  <div><slot /></div>
</template>
